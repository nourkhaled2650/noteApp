import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_CONNECT_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str(),
});
