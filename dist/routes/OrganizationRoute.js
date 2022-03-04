"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrganizationController_1 = require("../controller/OrganizationController");
const router = express_1.default.Router();
router.post("/organization", OrganizationController_1.registerOrganization); //User Registration route
exports.default = router;
//# sourceMappingURL=OrganizationRoute.js.map