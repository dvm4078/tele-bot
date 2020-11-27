import { Router } from "express";

import MetaController from "./controllers/meta.controller";
import errorHandler from "./middleware/error-handler";

const routes = new Router();

routes.get("/", MetaController.index);

routes.use(errorHandler);

export default routes;
