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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const return_user_object_1 = require("./return-user.object");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getById(id, selectObject = {}) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                ...return_user_object_1.returnUserObject,
                favorites: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                        slug: true,
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                ...selectObject
            }
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async toggleFavorite(userId, productId) {
        const user = await this.getById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        const isExists = user.favorites.some(product => product.id === productId);
        await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                favorites: {
                    [isExists ? 'disconnect' : 'connect']: {
                        id: productId
                    }
                }
            }
        });
        return { message: 'Success' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map