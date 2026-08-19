import { Router, type Request, type Response } from 'express';
import type { ResourceModel } from '../models/index.js';

function createResourceRouter(resourceModel: ResourceModel) {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    const records = await resourceModel.find().lean();
    response.json(records);
  });

  router.post('/', async (request: Request, response: Response) => {
    const record = await resourceModel.create(request.body);
    response.status(201).json(record);
  });

  return router;
}

export default createResourceRouter;
