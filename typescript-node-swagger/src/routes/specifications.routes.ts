import { Request, Response, Router } from "express";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoute = Router();

specificationsRoute.post("/", (req: Request, res: Response) => {
  return createSpecificationController.handle(req, res);
});

export { specificationsRoute };
