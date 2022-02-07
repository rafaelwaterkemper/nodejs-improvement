import { Router, Request, Response } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoute = Router();

categoriesRoute.post("/", (req: Request, res: Response): Response => {
  return createCategoryController.handle(req, res);
});

categoriesRoute.get("/", (req: Request, res: Response): Response => {
  return listCategoriesController.handle(req, res);
});

export { categoriesRoute };