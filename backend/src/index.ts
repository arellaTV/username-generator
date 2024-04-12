import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import {
  ContainerTypes,
  ExpressJoiError,
  ValidatedRequest,
  ValidatedRequestSchema,
  createValidator,
} from "express-joi-validation";
import * as Joi from "joi";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const validator = createValidator({ passError: true });

var whitelist = [
  process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  process.env.BACKEND_ORIGIN || "http://localhost:3000",
];
var corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin as string) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const querySchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  favoriteFruit: Joi.string().required(),
});

interface UsernameGeneratorRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    favoriteFruit: string;
  };
}

app.get(
  "/username",
  validator.query(querySchema),
  (req: ValidatedRequest<UsernameGeneratorRequestSchema>, res: Response) => {
    console.log(req.query);
    const { firstName, lastName, dateOfBirth, favoriteFruit } = req.query;

    const firstNameSanitized = firstName
      ?.toLowerCase()
      ?.replaceAll(" ", "")
      .replace(/\W/g, "");
    const lastNameSanitized = lastName
      ?.toLowerCase()
      ?.replaceAll(" ", "")
      .replace(/\W/g, "");
    const favoriteFruitSanitized = favoriteFruit
      ?.toLowerCase()
      ?.replaceAll(" ", "");
    const year = new Date(dateOfBirth).getFullYear();
    res.json({
      username: `${firstNameSanitized}_${lastNameSanitized}_${favoriteFruitSanitized}${year}`,
    });
  }
);

app.use(
  (
    err: any | ExpressJoiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err && err.error && err.error.isJoi) {
      res.status(400).json({
        type: err.type,
        message: err.error.toString(),
      });
    } else {
      next(err);
    }
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
