import app from ".";
import { ActivityRepository } from "./api/activity/activityRepository";
const port = process.env.SERVER_PORT;
import { connectToDatabase } from "./db";

// Starting the server
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
