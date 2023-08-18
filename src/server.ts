import app from ".";
const port = process.env.SERVER_PORT || 3000;
import { db } from "./db"; // Importar la conexión a la base de datos desde el archivo db.ts
import { updateActivitiesWithDescription } from "./utils/addDescriptionAndLinksToActivities";

// Starting the server
db.once("open", () => {
  console.log(`Successfully connected to database: ${db.name}`);
  app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
    updateActivitiesWithDescription();
  });
});

db.on("error", (error) => {
  console.error("Error connecting to the database:", error);
});
