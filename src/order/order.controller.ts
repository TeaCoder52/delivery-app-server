import { Controller, Get, HttpCode, Post } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { OrderService } from './order.service'

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	@Auth()
	async getAll() {
		return this.orderService.getAll()
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createOrder(@CurrentUser('id') userId: string) {
		return this.orderService.createOrder(userId)
	}
}
