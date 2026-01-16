import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AggregatorService } from './aggregator.service';
import { AppController } from './app.controller';
import { TmdbModule } from './tmdb/tmdb.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TmdbModule,
    FirebaseModule,
    UserModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AggregatorService],
})
export class AppModule { }
