import { Router } from "express";
import { facebookOauth } from "./facebookOauth.js";
import { googleOauth } from "./googleOauth.js";

export const apiRouter = Router();

apiRouter.use("/auth/google", googleOauth);
apiRouter.use("/auth/facebook", facebookOauth);
