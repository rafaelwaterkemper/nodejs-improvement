import express from "express";
import { categoriesRoute } from "./routes/categories.route"

const app = express();

app.get('/categories', categoriesRoute)

app.listen(3000, () => console.log('listening on port 3000'))