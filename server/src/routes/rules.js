import express from 'express';
import axios from 'axios';

const authorizationHeader = `Bearer ${process.env.TWITTER_TOKEN}`;

export default function getRulesRouter() {
  const router = express.Router();
  router.get('/', getRules);
  router.post('/', createRule);
  router.delete('/:id', deleteRule);
  return router;
}

async function getRules(req, res) {
  let rules = [];

  try {
    const response = await axios.get(
      'https://api.twitter.com/2/tweets/search/stream/rules',
      { headers: { Authorization: authorizationHeader } },
    );

    if (response.data.data) {
      rules = response.data.data.map((rule) => ({
        id: rule.id,
        value: rule.value.split(' ')[0],
      }));
    }
    return res.send(rules);
  } catch (error) {
    return res.status(500).send('Error connecting to twitter API');
  }
}

async function createRule(req, res) {
  const { value } = req.body;
  const newRule = {
    add: [{ value: `${value} lang:en`, tag: `${value}-${Date.now()}` }],
  };

  try {
    const response = await axios.post(
      'https://api.twitter.com/2/tweets/search/stream/rules',
      newRule,
      {
        headers: { Authorization: authorizationHeader },
      },
    );
    const createdRule = {
      id: response.data.data[0].id,
      value: response.data.data[0].value.split(' ')[0],
    };
    return res.send(createdRule);
  } catch (err) {
    return res.status(500).send('Error connecting to twitter API');
  }
}

async function deleteRule(req, res) {
  const ruleBody = {
    delete: {
      ids: [req.params.id],
    },
  };

  try {
    await axios.post(
      'https://api.twitter.com/2/tweets/search/stream/rules',
      ruleBody,
      {
        headers: { Authorization: authorizationHeader },
      },
    );
    return res.send({ deleted: 1, id: req.params.id });
  } catch (err) {
    return res.status(500).send('Error connecting to twitter API');
  }
}
