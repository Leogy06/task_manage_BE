import app from "./app.js";
import { chalkGreen } from "./utils/chalkUtils.js";
const port = process.env.PORT || 3002;

// Load environment variables
import "./config/environment.js";

app.listen(port, () => {
  console.log(chalkGreen(`Server is running on port ${port}`));
});
