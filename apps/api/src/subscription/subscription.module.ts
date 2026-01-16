import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { FirebaseModule } from '../firebase/firebase.module'; // Import FirebaseModule

@Module({
    imports: [FirebaseModule],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
})
export class SubscriptionModule { }
