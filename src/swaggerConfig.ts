import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "My API",
        description: "API documentation",
    },
    host: "localhost:5000",  // Replace with your host
    schemes: ["http"],
    securityDefinitions: {
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        },
    },
};

const outputFile = "./swagger-output.json";  // File where swagger output will be saved
const endpointsFiles = ["./src/services/userservice/routes/userRoutes.ts" ];  // List your route files here

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
    await import("./index"); // Your entry point (e.g., index.ts) to start the server after generating Swagger docs
});
