import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { StripeModule } from './stripe/stripe.module';
import { OrderModule } from './order/order.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		}),
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		CategoryModule,
		ProductModule,
		StripeModule,
		OrderModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
