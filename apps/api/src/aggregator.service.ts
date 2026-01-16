import { Injectable } from '@nestjs/common';
import { TmdbService } from './tmdb/tmdb.service';

export interface ContentItem {
    id: string;
    title: string;
    providers: string[]; // Still mock for now as TMDB doesn't return providers directly in 'search/multi' without extra calls
    type: 'movie' | 'series';
    image: string;
}

@Injectable()
export class AggregatorService {
    constructor(private readonly tmdbService: TmdbService) { }

    async findAll(): Promise<ContentItem[]> {
        const results = await this.tmdbService.getTrending();
        return this.mapTmdbToContent(results);
    }

    async search(query: string): Promise<ContentItem[]> {
        const results = await this.tmdbService.searchMulti(query);
        return this.mapTmdbToContent(results);
    }

    async discover(genreId?: string, providerId?: string): Promise<ContentItem[]> {
        const results = await this.tmdbService.discover(genreId, providerId);
        return this.mapTmdbToContent(results);
    }

    private mapTmdbToContent(results: any[]): ContentItem[] {
        return results.map(item => ({
            id: item.id.toString(),
            title: item.title || item.name || 'Untitled',
            providers: ['TMDB'], // Fallback info
            type: item.media_type === 'tv' ? 'series' : 'movie',
            image: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
        }));
    }

    async recommendForUser(userId: string): Promise<ContentItem[]> {
        // Keeping this mock for now until we have user data
        return this.findAll();
    }
}
