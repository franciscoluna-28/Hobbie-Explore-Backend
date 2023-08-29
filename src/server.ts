import app from ".";
const port = process.env.SERVER_PORT || 3000;
import { db } from "./db"; // Importar la conexión a la base de datos desde el archivo db.ts
import { updateActivitiesWithDescription } from "./utils/addDescriptionAndLinksToActivities";
import PredefinedActivityModel from "./api/activity/default-activity-model";

// Starting the server
db.once("open", () => {
  console.log(`Successfully connected to database: ${db.name}`);
  app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
    updateActivitiesWithDescription();
  });
});

// Actualizar todos los documentos para eliminar el campo _id
async function updateActivities() {
  try {
    const activities = await PredefinedActivityModel.find();
    for (const activity of activities) {
      await PredefinedActivityModel.updateOne({ _id: activity._id }, { $unset: { _id: "" } });
    }
    console.log("Campos _id eliminados de las actividades previas.");
  } catch (error) {
    console.error("Error al actualizar las actividades:", error);
  }
}


db.on("error", (error) => {
  console.error("Error connecting to the database:", error);
});

updateActivities().then((result) => {
  console.log(result);
})
