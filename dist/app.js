"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const OrganizationRoute_1 = __importDefault(require("./routes/OrganizationRoute"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//Routers
app.use('/users', UserRoute_1.default);
app.use("/register", OrganizationRoute_1.default);
// catch 404 and forward to error handler
app.use(function (next) {
    next((0, http_errors_1.default)(404));
});
exports.default = app;
//# sourceMappingURL=app.js.map