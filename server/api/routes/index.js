import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';

const fileUrl = fileURLToPath(import.meta.url);
const directoryName = dirname(fileUrl);

const expressRouter = express.Router();

/**
 * Export routes
 * @param {String} filename
 */
const routeExporter = (filename) => {
  if (filename === 'index.js') return;
  import(`./${filename}`).then(({ router, path }) => {
    expressRouter.use(path, router);
  });
};

fs.readdirSync(directoryName).forEach(routeExporter);

export default expressRouter;
