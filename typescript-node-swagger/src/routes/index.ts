import { Router } from "express";

import { categoriesRoute } from "./categories.routes";
import { specificationsRoute } from "./specifications.routes";

const router = Router();

router.use("/categories", categoriesRoute);
router.use("/specifications", specificationsRoute);

export { router };