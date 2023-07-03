import app from ".";
import { getRandomActivityWithImage } from "./api/activity/getActivityWithImage";

const port = process.env.SERVER_PORT;

//TODO connect to database
// Starting the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
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

 console.log(getRandomActivityWithImage());
 