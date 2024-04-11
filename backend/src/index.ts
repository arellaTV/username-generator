import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as Joi from "joi";
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
  createValidator,
} from "express-joi-validation";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const validator = createValidator();

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

    const firstNameSanitized = firstName?.toLowerCase()?.replaceAll(" ", "");
    const lastNameSanitized = lastName?.toLowerCase()?.replaceAll(" ", "");
    const favoriteFruitSanitized = favoriteFruit
      ?.toLowerCase()
      ?.replaceAll(" ", "");
    const year = new Date(dateOfBirth).getFullYear();
    res.json({
      username: `${firstNameSanitized}_${lastNameSanitized}_${favoriteFruitSanitized}${year}`,
    });
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
