import { Request, Response } from 'express';
import { FindAllClientDeliveriesUseCase } from '../useCases/FindAllClientDeliveriesUseCase';

export class FindAllClientDeliveriesController {
  async handle(req: Request, res: Response) {
    const { id_client } = req;

    const findAllClientDeliveriesUseCase = new FindAllClientDeliveriesUseCase();

    const deliveries = await findAllClientDeliveriesUseCase.execute(id_client);

    return res.status(200).json(deliveries);
  }
}
