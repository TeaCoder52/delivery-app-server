import { Prisma } from '@prisma/client';
export declare class ProductDto implements Prisma.ProductUpdateInput {
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: string;
}
