"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToNumber = void 0;
function convertToNumber(input) {
    const number = +input;
    return isNaN(number) ? undefined : number;
}
exports.convertToNumber = convertToNumber;
//# sourceMappingURL=convert-to-number.js.map