import { Response } from 'express';
import { StripeService } from './stripe.service';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createPaymentIntent(body: {
        amount: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
}
