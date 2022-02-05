import { Request, Response, Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoute = Router();

const specificationsRepository = new SpecificationsRepository();

const createSpecificationService = new CreateSpecificationService(
  specificationsRepository,
);

specificationsRoute.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;

  createSpecificationService.execute({ name, description });

  return res.status(201).send();
});

export { specificationsRoute };
