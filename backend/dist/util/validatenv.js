"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    MONGO_CONNECT_STRING: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)(), //nourkhaled2650:J49t6vOKdXK2O3CZ@cluster0.u9ql5lv.mongodb.net/?retryWrites=true&w=majority"
});
