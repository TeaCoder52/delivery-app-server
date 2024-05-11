"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnProductObjectFullest = exports.returnProductObject = void 0;
const return_category_object_1 = require("../category/return-category.object");
exports.returnProductObject = {
    image: true,
    description: true,
    id: true,
    name: true,
    price: true,
    createdAt: true,
    slug: true,
    category: { select: return_category_object_1.returnCategoryObject }
};
exports.returnProductObjectFullest = {
    ...exports.returnProductObject
};
//# sourceMappingURL=return-product.object.js.map