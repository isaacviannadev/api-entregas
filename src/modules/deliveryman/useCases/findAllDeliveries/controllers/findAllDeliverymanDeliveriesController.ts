import { Request, Response } from 'express';
import { FindAllDeliverymanDeliveriesUseCase } from '../useCases/FindAllDeliverymanDeliveriesUseCase';

export class FindAllDeliverymanDeliveriesController {
  async handle(req: Request, res: Response) {
    const { id_deliveryman } = req;

    const findAllDeliverymanDeliveriesUseCase =
      new FindAllDeliverymanDeliveriesUseCase();

    const deliveries = await findAllDeliverymanDeliveriesUseCase.execute(
      id_deliveryman
    );

    return res.status(200).json(deliveries);
  }
}
