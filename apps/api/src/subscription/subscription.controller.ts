import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../firebase/firebase.guard';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
@UseGuards(FirebaseAuthGuard)
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Get('status')
    getStatus(@Req() req) {
        return this.subscriptionService.getStatus(req.user.uid);
    }

    @Post('upgrade')
    upgrade(@Req() req) {
        return this.subscriptionService.upgradeToPro(req.user.uid);
    }
}
