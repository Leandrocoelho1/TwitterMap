require("dotenv").config();
const spawn = require("await-spawn");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { get } = require("https");

const app = express();
app.use(express.json());
app.use(cors());

const authorizationHeader = `Bearer ${process.env.TWITTER_TOKEN}`;
let hasConnection = false;

app.post("/rules", async (req, res) => {
  const { value } = req.body;
  const newRule = {
    add: [{ value: `${value} lang:en`, tag: `${value}-${Date.now()}` }],
  };

  try {
    const response = await axios.post(
      "https://api.twitter.com/2/tweets/search/stream/rules",
      newRule,
      {
        headers: { Authorization: authorizationHeader },
      }
    );
    const createdRule = {
      id: response.data.data[0].id,
      value: response.data.data[0].value.split(" ")[0],
    };
    res.send(createdRule);
  } catch (err) {
    res.status(500).send("Error connecting to twitter API");
  }
});

app.delete("/rules/:id", async (req, res) => {
  const deleteRule = {
    delete: {
      ids: [req.params.id],
    },
  };

  try {
    await axios.post(
      "https://api.twitter.com/2/tweets/search/stream/rules",
      deleteRule,
      {
        headers: { Authorization: authorizationHeader },
      }
    );
    res.send({ deleted: 1, id: req.params.id });
  } catch (err) {
    res.status(500).send("Error connecting to twitter API");
  }
});

app.get("/rules", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.twitter.com/2/tweets/search/stream/rules",
      { headers: { Authorization: authorizationHeader } }
    );

    if (!response.data.data) {
      return res.send([]);
    }

    const rules = response.data.data.map((rule) => ({
      id: rule.id,
      value: rule.value.split(" ")[0],
    }));

    res.send(rules);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error connecting to twitter API");
  }
});

app.get("/connections", (req, res) => {
  res.send({ hasConnection });
});

app.get("/stream", async (req, res) => {
  console.log("get stream called");
  hasConnection = true;

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);
  res.write("open", "Client Connected");
  res.write(`data: \n\n`);

  const newTweet = {
    id: "1314692646678543295",
    text:
      "When discussing design system APIs, I&apos;ve coined the term developery which is a pejorative term for something that sounds like a developer made it up rather than accurately modelling the domain.",
    user: "Leandro Coelho",
    createdAt: "10/6/20 - 11:04:26 AM GMT-3",
    place: [-23.1288771, -46.572791],
    tone: 1,
  };

  res.write(`data: ${JSON.stringify(newTweet)}\n\n`);

  const anotherTweet = {
    id: "1314692646678540295",
    text:
      "When discussing design system APIs, I&apos;ve coined the term developery which is a pejorative term for something that sounds like a developer made it up rather than accurately modelling the domain.",
    user: "Leandro Coelho",
    createdAt: "10/6/20 - 11:04:26 AM GMT-3",
    place: [-22.1288771, -45.572791],
    tone: 0,
  };

  res.write(`data: ${JSON.stringify(anotherTweet)}\n\n`);

  // const CancelToken = axios.CancelToken;
  // let cancelFunction;

  // axios({
  //   method: "get",
  //   url:
  //     "https://api.twitter.com/2/tweets/search/stream?expansions=author_id,geo.place_id&tweet.fields=created_at,geo,text,id,lang&user.fields=name&place.fields=geo",
  //   responseType: "stream",
  //   cancelToken: new CancelToken(function executor(c) {
  //     cancelFunction = c;
  //   }),
  //   headers: {
  //     Authorization: authorizationHeader,
  //   },
  // })
  //   .then((response) => {
  //     console.log("receiving stream..");
  //     const stream = response.data;
  //     stream.on("data", (data) => {
  //       writeData(data.toString()).then(function (tweet) {
  //         if (tweet) {
  //           res.write(`data: ${tweet}\n\n`);
  //         }
  //       });
  //     });
  //   })
  //   .catch(function (thrown) {
  //     if (axios.isCancel(thrown)) {
  //       console.log("Request canceled", thrown.message);
  //     }
  //     console.log(thrown.message);
  //   });

  req.on("close", () => {
    console.log("client disconnected");
    // cancelFunction("Operation canceled by the user.");
    hasConnection = false;
  });
});

app.get("/loko", async (req, res) => {
  const { message } = req.body;

  const messageSentiment = await analyzeSentinmentAzure(message);
  res.send({ sentiment: messageSentiment });
});

async function writeData(data) {
  if (data.trim()) {
    const tweet = JSON.parse(data);

    let place = [];
    if (tweet.includes.places && tweet.includes.places.length) {
      const box = tweet.includes.places[0].geo.bbox;
      const lat = (box[1] + box[3]) / 2;
      const lon = (box[0] + box[2]) / 2;
      place = [lat, lon];
    }

    const createdAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "long",
    })
      .format(new Date(tweet.data.created_at))
      .split(", ")
      .join(" - ");

    // chamar analise de sentimento

    const newTweet = {
      id: tweet.data.id,
      text: tweet.data.text,
      user: tweet.includes.users[0].name,
      username: tweet.includes.users[0].username,
      tone: 1,
      place,
      createdAt,
    };
    console.log(JSON.stringify(newTweet));
    return JSON.stringify(newTweet);
  }
}

async function analyzeSentinmentAzure(message) {
  const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": process.env.AZURE_TOKEN,
  };

  const document = {
    documents: [
      {
        language: "en",
        id: "1",
        text: message,
      },
    ],
  };

  const response = await axios.post(
    `${process.env.AZURE_ENDPOINT}/text/analytics/v3.0/sentiment`,
    document,
    { headers }
  );

  console.log(response.data.documents[0]);

  return response.data.documents[0].sentiment;
}

async function analyseSentimentPython(message) {
  try {
    const scriptResponse = await spawn("python", ["script.py", message]);
    return scriptResponse.toString();
  } catch (err) {
    console.log(err.stderr.toString());
  }
}

// axios({
//   method: "get",
//   url:
//     "https://api.twitter.com/2/tweets/search/stream?expansions=author_id,geo.place_id&tweet.fields=created_at,geo,text,id,lang&user.fields=name&place.fields=geo",
//   responseType: "stream",
//   headers: {
//     Authorization: authorizationHeader,
//   },
// }).then((response) => {
//   console.log("receiving stream...");
//   const stream = response.data;
//   stream.on("data", (data) => {
//     // console.log(data.toString());
//     // res.write(`data: ${data.toString()}\n\n`);
//     writeData(data.toString());
//   });
// });

app.listen(8888, () => {
  console.log("listening on 8888");
});
