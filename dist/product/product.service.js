"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("../category/category.service");
const prisma_service_1 = require("../prisma.service");
const generate_slug_1 = require("../utils/generate-slug");
const return_product_object_1 = require("./return-product.object");
let ProductService = class ProductService {
    constructor(prisma, categoryService) {
        this.prisma = prisma;
        this.categoryService = categoryService;
    }
    async getAll(searchTerm) {
        if (searchTerm) {
            return this.search(searchTerm);
        }
        return this.prisma.product.findMany({
            select: return_product_object_1.returnProductObject,
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async search(searchTerm) {
        return this.prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            select: return_product_object_1.returnProductObject
        });
    }
    async bySlug(slug) {
        const product = await this.prisma.product.findUnique({
            where: {
                slug
            },
            select: return_product_object_1.returnProductObjectFullest
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found!');
        return product;
    }
    async byCategory(categorySlug) {
        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug
                }
            },
            select: return_product_object_1.returnProductObjectFullest
        });
        if (!products)
            throw new common_1.NotFoundException('Products not found!');
        return products;
    }
    async create() {
        const product = await this.prisma.product.create({
            data: {
                description: '',
                name: '',
                price: 0,
                slug: '',
                image: ''
            }
        });
        return product.id;
    }
    async update(id, dto) {
        const { description, image, price, name, categoryId } = dto;
        await this.categoryService.getById(categoryId);
        return this.prisma.product.update({
            where: {
                id
            },
            data: {
                description,
                image,
                price,
                name,
                slug: (0, generate_slug_1.generateSlug)(name),
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        });
    }
    async delete(id) {
        return this.prisma.product.delete({ where: { id } });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        category_service_1.CategoryService])
], ProductService);
//# sourceMappingURL=product.service.js.map