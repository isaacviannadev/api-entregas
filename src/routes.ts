import { Router } from 'express';
import { ensureAthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { AuthenticateClientController } from './modules/account/authenticateClient/controllers/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/controllers/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/controllers/CreateClientController';
import { FindAllClientDeliveriesController } from './modules/clients/useCases/deliveries/controllers/FindAllClientDeliveriesController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/controllers/CreateDeliveryController';
import { FindAllAvailablesController } from './modules/deliveries/useCases/findAllAvailables/controllers/FindAllAvailablesController';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/controllers/UpdateDeliverymanController';
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate copy/controllers/UpdateEndDateController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/controllers/CreateDeliverymanController';
import { FindAllDeliverymanDeliveriesController } from './modules/deliveryman/useCases/findAllDeliveries/controllers/findAllDeliverymanDeliveriesController';

const routes = Router();

//CONTROLLERS
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailablesController = new FindAllAvailablesController();
const updateDeliverymanController = new UpdateDeliverymanController();
const updateEndDateController = new UpdateEndDateController();
const findAllClientDeliveriesController =
  new FindAllClientDeliveriesController();
const findAllDeliverymanDeliveriesController =
  new FindAllDeliverymanDeliveriesController();

// CLIENTES
routes.post('/client/', createClientController.handle);
routes.post('/client/auth', authenticateClientController.handle);
routes.get(
  '/client/deliveries',
  ensureAthenticateClient,
  findAllClientDeliveriesController.handle
);

// DELIVERYMEN
routes.post('/deliveryman/', createDeliverymanController.handle);
routes.post('/deliveryman/auth', authenticateDeliverymanController.handle);
routes.get(
  '/deliveryman/deliveries',
  ensureAuthenticateDeliveryman,
  findAllDeliverymanDeliveriesController.handle
);

//DELIVERIES
routes.post(
  '/delivery',
  ensureAthenticateClient,
  createDeliveryController.handle
);

routes.put(
  '/delivery/updateDeliveryman/:id',
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);
routes.put(
  '/delivery/updateEndDate/:id',
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
);

routes.get(
  '/delivery/available',
  ensureAuthenticateDeliveryman,
  findAllAvailablesController.handle
);

export { routes };
