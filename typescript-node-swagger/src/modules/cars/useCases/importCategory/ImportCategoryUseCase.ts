import fs from "fs";
import parse from "csv-parser";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from "../../model/Category";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parser = parse();
      stream.pipe(parser);

      parser
        .on("data", async (line) => {
          const { name, description } = line;
          const category = new Category();
          Object.assign(category, {
            name,
            description,
          });
          categories.push(category);
        })
        .on("end", () => resolve(categories))
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    try {
      const categories = await this.loadCategories(file);
      categories.map((category) => {
        const { name, description } = category;

        const exists = this.categoriesRepository.findByName(name);

        if (!exists) {
          this.categoriesRepository.create({ name, description });
        }
      });
    } catch (err) {
      throw err;
    }
  }
}

export { ImportCategoryUseCase };
