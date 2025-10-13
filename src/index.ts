import app from "./app.js";
import { chalkGreen } from "./utils/chalkUtils.js";

// Load environment variables
import "./config/environment.js";

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(chalkGreen(`Server is running on port ${port}`));
});
