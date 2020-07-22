"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtExpiredError = void 0;
var custom_error_1 = require("./custom-error");
var JwtExpiredError = /** @class */ (function (_super) {
    __extends(JwtExpiredError, _super);
    function JwtExpiredError() {
        var _this = _super.call(this, 'jwt expired') || this;
        _this.statusCode = 403;
        Object.setPrototypeOf(_this, JwtExpiredError.prototype);
        return _this;
    }
    JwtExpiredError.prototype.serializeErrors = function () {
        return [{ message: 'jwt expired' }];
    };
    return JwtExpiredError;
}(custom_error_1.CustomError));
exports.JwtExpiredError = JwtExpiredError;
