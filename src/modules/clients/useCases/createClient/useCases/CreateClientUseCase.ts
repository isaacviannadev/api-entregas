import { prisma } from '../../../../../database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    // Validar se usuário já existe
    const clientExist = await prisma.clients.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
    });

    if (clientExist) {
      throw new Error('Client already exists');
    }

    // Criptografar password

    const hashPassword = await hash(password, 10);

    // Salvar o cliente

    const client = await prisma.clients.create({
      data: { username, password: hashPassword },
    });

    return client;
  }
}
