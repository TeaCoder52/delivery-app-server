import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { StripeService } from './stripe.service'

@Controller('stripe')
export class StripeController {
	constructor(private readonly stripeService: StripeService) {}

	@Post('intents')
	@Auth()
	async createPaymentIntent(
		@Body() body: { amount: number },
		@Res() res: Response
	) {
		try {
			const paymentIntent = await this.stripeService.createPaymentIntent({
				amount: body.amount,
				currency: 'usd',
				automatic_payment_methods: {
					enabled: true
				}
			})
			return res.json({ paymentIntent: paymentIntent.client_secret })
		} catch (e) {
			res.status(400).json({ error: e.message })
		}
	}
}
