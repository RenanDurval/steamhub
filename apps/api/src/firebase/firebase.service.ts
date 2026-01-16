import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
    private readonly logger = new Logger(FirebaseService.name);

    constructor(private readonly configService: ConfigService) { }

    onModuleInit() {
        const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
        const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n');
        const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');

        if (!projectId || !privateKey || !clientEmail) {
            this.logger.warn('Firebase Admin credentials not found. Auth verification will fail.');
            return;
        }

        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    privateKey,
                    clientEmail,
                }),
            });
            this.logger.log('Firebase Admin Initialized');
        }
    }

    getAuth() {
        return admin.auth();
    }

    getFirestore() {
        return admin.firestore();
    }
}
