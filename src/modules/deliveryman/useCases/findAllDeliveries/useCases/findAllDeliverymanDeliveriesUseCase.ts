import { prisma } from '../../../../../database/prismaClient';

export class FindAllDeliverymanDeliveriesUseCase {
  async execute(id_deliveryman: string) {
    const deliverires = await prisma.deliveryman.findMany({
      where: { id: id_deliveryman },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    });

    return deliverires;
  }
}
