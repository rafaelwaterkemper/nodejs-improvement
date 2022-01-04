import express from "express";

import { categoriesRoute } from "./routes/categories.route";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoute);

app.listen(3000, () => console.log("listening on port 3000"));
