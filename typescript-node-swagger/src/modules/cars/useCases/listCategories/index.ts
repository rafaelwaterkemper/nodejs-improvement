import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { CategoriesUseCase } from "./CategoriesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";

const categoriesRespository = CategoriesRepository.getInstance();
const categoriesUseCase = new CategoriesUseCase(categoriesRespository);

const listCategoriesController = new ListCategoriesController(
  categoriesUseCase
);

export { listCategoriesController };
