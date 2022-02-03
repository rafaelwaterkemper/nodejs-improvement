import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class CategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute(): Category[] {
        return this.categoriesRepository.list();
    }
}

export { CategoriesUseCase }