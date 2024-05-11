import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
	private stripe: Stripe

	constructor() {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
	}

	async createPaymentIntent(options: Stripe.PaymentIntentCreateParams) {
		return this.stripe.paymentIntents.create(options)
	}
}
