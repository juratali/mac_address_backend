"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
// routes
var routes_1 = require("./routes/");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cors_1["default"])());
app.use("/", routes_1.json);
app.use("/", routes_1.user);
app.use("/", routes_1.telegram);
app.listen(9090, function () {
    console.log("Server running on http://localhost:9090");
});
//# sourceMappingURL=server.js.map