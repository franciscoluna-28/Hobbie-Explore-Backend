import app from ".";
const port = process.env.SERVER_PORT || 3000;
import { db } from "./db"; // Importar la conexión a la base de datos desde el archivo db.ts

// Starting the server
db.once("open", () => {
  console.log(`Successfully connected to database: ${db.name}`);

  app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
  


  });
});




/* async function removeDefaultActivities() {
  try {
    const updateResult = await UserModel.updateMany({}, { $unset: { savedDefaultActivities: 1 } });
    console.log(`${updateResult.modifiedCount} users' defaultActivities removed.`);
  } catch (error) {
    console.error('Error removing defaultActivities:', error);
  }
} */





db.on("error", (error) => {
  console.error("Error connecting to the database:", error);
});


