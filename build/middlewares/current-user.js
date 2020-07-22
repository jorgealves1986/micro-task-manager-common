"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var forbidden_error_1 = require("../errors/forbidden-error");
var jwt_expired_error_1 = require("../errors/jwt-expired-error");
exports.currentUser = function (req, res, next) {
    // (!req.session || !req.session.jwt) = (!req.session?.jwt)
    if (!req.headers.authorization) {
        return next();
    }
    try {
        var payload = jsonwebtoken_1.default.verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY);
        req.currentUser = payload;
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new jwt_expired_error_1.JwtExpiredError();
        }
        throw new forbidden_error_1.ForbiddenError();
    }
    next();
};
