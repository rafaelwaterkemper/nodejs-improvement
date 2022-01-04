import { Router, Request, Response } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoute = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoute.post("/", (req: Request, res: Response): Response => {
  const { name, description } = req.body;
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

categoriesRoute.get("/", (req: Request, res: Response): Response => {
  const categories = categoriesRepository.list();

  return res.json(categories);
});

export { categoriesRoute };
