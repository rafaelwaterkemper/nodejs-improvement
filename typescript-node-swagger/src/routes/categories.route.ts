import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";

const categoriesRoute = Router();
const categories = [];

categoriesRoute.post("/", (req: Request, res: Response): Response => {
    const { name, description } = req.body;

    const category = {
        id: randomUUID(),
        name,
        description
    }

    categories.push(category);

    return res.status(201).send();
});

export { categoriesRoute }