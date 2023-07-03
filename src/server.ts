import app from ".";
import { ActivityRepository } from "./api/activity/activityRepository";

const port = process.env.SERVER_PORT;










//TODO connect to database
// Starting the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const activityRepository = new ActivityRepository();
activityRepository.getOneRandomActivity().then((activity) => {
  console.log(activity);
}).catch((error) => {
  console.log(error);
});

/* async function getRandomActivity() {
  try {
    const data = await getOneRandomActivity();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

(async () => {
  try {
    const y = await getRandomActivity();
    getBestKeyword(y);
    console.table(y);
  } catch (error) {
    console.error(error);
  }
})(); */

