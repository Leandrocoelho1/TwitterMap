import express from 'express';
// import spawn from 'await-spawn';
import axios from 'axios';

const authorizationHeader = `Bearer ${process.env.TWITTER_TOKEN}`;
let hasConnection = false;

export default function getSreamRoutes() {
  const router = express.Router();
  router.get('/connections', getConnections);
  router.get('/', getStream);
  return router;
}

function getConnections(req, res) {
  res.send({ hasConnection });
}

async function getStream(req, res) {
  console.log('get stream called');
  hasConnection = true;

  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);
  res.write('open', 'Client Connected');
  res.write(`data: \n\n`);

  const { CancelToken } = axios;
  let cancelFunction;

  axios({
    method: 'get',
    url:
      'https://api.twitter.com/2/tweets/search/stream?expansions=author_id,geo.place_id&tweet.fields=created_at,geo,text,id,lang&user.fields=name&place.fields=geo',
    responseType: 'stream',
    cancelToken: new CancelToken(function executor(c) {
      cancelFunction = c;
    }),
    headers: {
      Authorization: authorizationHeader,
    },
  })
    .then((response) => {
      console.log('receiving stream..');
      const stream = response.data;
      stream.on('data', (data) => {
        writeData(data.toString()).then((tweet) => {
          if (tweet) {
            res.write(`data: ${tweet}\n\n`);
          }
        });
      });
    })
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      }
      console.log(thrown.message);
    });

  req.on('close', () => {
    console.log('client disconnected');
    cancelFunction('Operation canceled by the user.');
    hasConnection = false;
  });
}

async function writeData(data) {
  if (!data.trim()) {
    return null;
  }

  const tweet = JSON.parse(data);

  let place = [];
  if (tweet.includes.places && tweet.includes.places.length) {
    const box = tweet.includes.places[0].geo.bbox;
    const lat = (box[1] + box[3]) / 2;
    const lon = (box[0] + box[2]) / 2;
    place = [lat, lon];
  }

  const createdAt = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'long',
  })
    .format(new Date(tweet.data.created_at))
    .split(', ')
    .join(' - ');

  const messageSentiment = await analyzeSentimentAzure(tweet.data.text);

  const newTweet = {
    id: tweet.data.id,
    text: tweet.data.text,
    user: tweet.includes.users[0].name,
    username: tweet.includes.users[0].username,
    sentiment: messageSentiment,
    place,
    createdAt,
  };

  console.log(JSON.stringify(newTweet));
  return JSON.stringify(newTweet);
}

async function analyzeSentimentAzure(message) {
  const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': process.env.AZURE_TOKEN,
  };

  const document = {
    documents: [
      {
        language: 'en',
        id: '1',
        text: message,
      },
    ],
  };

  const response = await axios.post(
    `${process.env.AZURE_ENDPOINT}/text/analytics/v3.0/sentiment`,
    document,
    { headers },
  );

  console.log(response.data.documents[0]);

  return response.data.documents[0].sentiment;
}

// async function analyseSentimentPython(message) {
//   try {
//     const scriptResponse = await spawn('python', ['script.py', message]);
//     return scriptResponse.toString();
//   } catch (err) {
//     console.log(err.stderr.toString());
//   }
// }
