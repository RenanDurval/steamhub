import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { AddToWatchlistDto } from './user.dto';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly firebaseService: FirebaseService) { }

    async addToWatchlist(userId: string, item: AddToWatchlistDto) {
        try {
            const db = this.firebaseService.getFirestore();
            const watchlistRef = db.collection('users').doc(userId).collection('watchlist');

            // Check if already exists
            const doc = await watchlistRef.doc(item.tmdbId.toString()).get();
            if (doc.exists) {
                return { message: 'Item already in watchlist' };
            }

            await watchlistRef.doc(item.tmdbId.toString()).set({
                ...item,
                addedAt: new Date().toISOString(),
            });

            return { message: 'Added to watchlist', item };
        } catch (error) {
            this.logger.error(`Error adding to watchlist: ${error}`);
            throw error;
        }
    }

    async getWatchlist(userId: string) {
        try {
            const db = this.firebaseService.getFirestore();
            const snapshot = await db.collection('users').doc(userId).collection('watchlist').orderBy('addedAt', 'desc').get();

            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            this.logger.error(`Error fetching watchlist: ${error}`);
            return [];
        }
    }

    async removeFromWatchlist(userId: string, tmdbId: string) {
        try {
            const db = this.firebaseService.getFirestore();
            await db.collection('users').doc(userId).collection('watchlist').doc(tmdbId).delete();
            return { message: 'Removed from watchlist' };
        } catch (error) {
            this.logger.error(`Error removing from watchlist: ${error}`);
            throw error;
        }
    }
}
