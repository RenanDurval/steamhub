import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class SubscriptionService {
    private readonly logger = new Logger(SubscriptionService.name);

    constructor(private readonly firebaseService: FirebaseService) { }

    async getStatus(userId: string) {
        try {
            const db = this.firebaseService.getFirestore();
            const doc = await db.collection('users').doc(userId).get();
            const data = doc.data();
            return { plan: data?.plan || 'free' };
        } catch (error) {
            this.logger.error(`Error getting subscription status: ${error}`);
            return { plan: 'free' };
        }
    }

    async upgradeToPro(userId: string) {
        try {
            const db = this.firebaseService.getFirestore();
            await db.collection('users').doc(userId).set({ plan: 'pro' }, { merge: true });
            return { message: 'Upgraded to Pro!', plan: 'pro' };
        } catch (error) {
            this.logger.error(`Error upgrading subscription: ${error}`);
            throw error;
        }
    }
}
