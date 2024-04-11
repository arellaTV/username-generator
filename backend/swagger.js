const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Username Generator API",
    description: "An API that generates usernames based on user info.",
  },
  host: "localhost:3000",
};

const outputFile = "./src/swagger-output.json";
const routes = ["./src/index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
