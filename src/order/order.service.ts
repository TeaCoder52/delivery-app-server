import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class OrderService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return this.prisma.order.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async createOrder(userId: string) {
		const newOrder = await this.prisma.order.create({
			data: {
				reference: (Math.random() + 1).toString(36).substring(7),
				user: {
					connect: {
						id: userId
					}
				}
			}
		})

		return { newOrder, status: 'OK' }
	}
}
