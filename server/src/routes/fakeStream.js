import express from 'express';

let hasFakeConnection = false;

export default function getFakeSreamRoutes() {
  const router = express.Router();
  router.get('/connections', getConnections);
  router.get('/', getFakeStream);
  return router;
}

function getConnections(req, res) {
  res.send({ hasFakeConnection });
}

async function getFakeStream(req, res) {
  console.log('get stream called');
  hasFakeConnection = true;

  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);
  res.write('open', 'Client Connected');
  res.write(`data: \n\n`);

  const newTweet = {
    id: '1314692646678543295',
    text:
      'When discussing design system APIs, I&apos;ve coined the term developery which is a pejorative term for something that sounds like a developer made it up rather than accurately modelling the domain.',
    user: 'Leandro Coelho',
    createdAt: '10/6/20 - 11:04:26 AM GMT-3',
    place: [-23.1288771, -46.572791],
    sentiment: 'positive',
  };

  res.write(`data: ${JSON.stringify(newTweet)}\n\n`);

  const anotherTweet = {
    id: '1314692646678540295',
    text:
      'When discussing design system APIs, I&apos;ve coined the term developery which is a pejorative term for something that sounds like a developer made it up rather than accurately modelling the domain.',
    user: 'Leandro Coelho',
    createdAt: '10/6/20 - 11:04:26 AM GMT-3',
    place: [-22.1288771, -45.572791],
    sentiment: 'positive',
  };

  res.write(`data: ${JSON.stringify(anotherTweet)}\n\n`);

  req.on('close', () => {
    console.log('client disconnected');
    hasFakeConnection = false;
  });
}
