import { Request, Response } from 'express';
import { FindAllAvailablesUseCase } from '../useCases/FindAllAvailablesUseCase';

interface IFindAllAvailabes {}

export class FindAllAvailablesController {
  async handle(req: Request, res: Response) {
    const findAllAvailablesUseCase = new FindAllAvailablesUseCase();

    const deliveries = await findAllAvailablesUseCase.execute();

    return res.json(deliveries);
  }
}
