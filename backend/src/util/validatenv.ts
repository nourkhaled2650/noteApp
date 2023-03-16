import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_CONNECT_STRING: str(),
  PORT: port(), //nourkhaled2650:J49t6vOKdXK2O3CZ@cluster0.u9ql5lv.mongodb.net/?retryWrites=true&w=majority"
});
