"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const userValidation_1 = require("./../utilis/userValidation");
(req, res) => {
    const { error } = (0, userValidation_1.validateUserSignUp)(req.body);
};
//# sourceMappingURL=User.js.map