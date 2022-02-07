import { Router, Request, Response, response } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoute = Router();

const upload = multer({
  dest: "./tmp"
})

categoriesRoute.post("/", (req: Request, res: Response): Response => {
  return createCategoryController.handle(req, res);
});

categoriesRoute.get("/", (req: Request, res: Response): Response => {
  return listCategoriesController.handle(req, res);
});

categoriesRoute.post("/import", upload.single("file"), (req: Request, res: Response) => {
  return importCategoryController.handle(req, res);
})

export { categoriesRoute };
