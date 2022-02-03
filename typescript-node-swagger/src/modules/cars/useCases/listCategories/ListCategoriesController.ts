import { Request, Response } from "express";
import { CategoriesUseCase } from "./CategoriesUseCase";

class ListCategoriesController {
  constructor(private categoriesUseCase: CategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const categories = this.categoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
