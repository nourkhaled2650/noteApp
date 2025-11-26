import mongoose from "mongoose";
import app from "./app";
import env from "./util/validatenv";

const port = env.PORT;

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log("mongos connected");
    app.listen(port, () => {
      console.log("server is running on port " + port);
    });
  })
  .catch(console.error);
