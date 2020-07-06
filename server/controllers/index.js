import { Router } from 'express'
import middleware from '../middleware'

import team from "./team";

const router = Router();

router.use("/team", middleware.authentication.authenticate, team);
router.get("/", (req, res) => { res.json({ message: "Backend" })});

export default router