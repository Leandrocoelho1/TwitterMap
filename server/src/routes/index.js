import express from 'express';
import getRulesRoutes from './rules';
import getStreamRoutes from './stream';
import getFakeStreamRoutes from './fakeStream';

export default function getRoutes() {
  const router = express.Router();
  router.use('/rules', getRulesRoutes());
  router.use('/stream', getStreamRoutes());
  router.use('/fake-stream', getFakeStreamRoutes());
  return router;
}
