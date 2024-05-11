import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
	controllers: [OrderController],
	providers: [OrderService, PrismaService, UserService]
})
export class OrderModule {}
