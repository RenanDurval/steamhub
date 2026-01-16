import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { AggregatorService } from './aggregator.service';
import { FirebaseAuthGuard } from './firebase/firebase.guard';

@Controller('stream')
export class AppController {
    constructor(private readonly aggregatorService: AggregatorService) { }

    @Get('catalog')
    getCatalog() {
        return this.aggregatorService.findAll();
    }

    @Get('stream/search')
    search(@Query('q') q: string) {
        return this.aggregatorService.search(q);
    }

    @Get('stream/discover')
    discover(
        @Query('genre') genreId?: string,
        @Query('provider') providerId?: string
    ) {
        return this.aggregatorService.discover(genreId, providerId);
    }

    @Get('recommend')
    @UseGuards(FirebaseAuthGuard)
    getRecommendations(@Req() req) {
        const userId = req.user.uid;
        return this.aggregatorService.recommendForUser(userId);
    }
}
