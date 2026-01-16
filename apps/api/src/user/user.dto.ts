export class AddToWatchlistDto {
    tmdbId!: number;
    title!: string;
    type!: 'movie' | 'series';
    posterPath!: string;
}
