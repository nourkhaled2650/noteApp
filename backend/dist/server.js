"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const validatenv_1 = __importDefault(require("./util/validatenv"));
const port = validatenv_1.default.PORT;
mongoose_1.default
    .connect(validatenv_1.default.MONGO_CONNECT_STRING)
    .then(() => {
    console.log("mongos connected");
    app_1.default.listen(port, () => {
        console.log("server is running on port " + port);
    });
})
    .catch(console.error);
