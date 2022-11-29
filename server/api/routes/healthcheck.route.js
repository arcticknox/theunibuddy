import express from 'express';
const router = express.Router();
const path = '/healthcheck';

router.route('/')
    .get(async (req, res)=>{
      const healthcheck = {
        uptime: process.uptime(),
        responsetime: process.hrtime(),
        message: 'OK',
        timestamp: Date.now(),
      };
      try {
        res.send(healthcheck);
      } catch (e) {
        healthcheck.message = e;
        res.status(503).send();
      }
    });

export {
  router,
  path,
};
