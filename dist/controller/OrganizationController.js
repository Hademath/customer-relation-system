"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerOrganization = void 0;
const organization_1 = __importDefault(require("../db/models/organization"));
const { Organization } = organization_1.default;
async function registerOrganization(req, res, next) {
    try {
        res.send("Organization working");
    }
    catch (error) {
        res.send("error");
    }
}
exports.registerOrganization = registerOrganization;
//# sourceMappingURL=OrganizationController.js.map