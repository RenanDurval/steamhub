import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../firebase/firebase.guard';
import { UserService } from './user.service';
import { AddToWatchlistDto } from './user.dto';

@Controller('user')
@UseGuards(FirebaseAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('watchlist')
    getWatchlist(@Req() req) {
        return this.userService.getWatchlist(req.user.uid);
    }

    @Post('watchlist')
    addToWatchlist(@Req() req, @Body() body: AddToWatchlistDto) {
        return this.userService.addToWatchlist(req.user.uid, body);
    }

    @Delete('watchlist/:id')
    removeFromWatchlist(@Req() req, @Param('id') id: string) {
        return this.userService.removeFromWatchlist(req.user.uid, id);
    }
}
