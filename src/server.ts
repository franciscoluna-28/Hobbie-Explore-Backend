import app from ".";

const port = process.env.SERVER_PORT;
import { getRandomActivities, getRandomActivitiesByType } from "./api/boredAPI/getActivitiesFromAPI";


// Starting the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

getRandomActivities(4).then((data) => {console.log(data)});
getRandomActivitiesByType(4, "cooking").then((data) => {console.log(data)});
