import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { TmdbSearchResult, TmdbMedia } from './interfaces/tmdb.interface';

@Injectable()
export class TmdbService {
    private readonly logger = new Logger(TmdbService.name);
    private readonly apiKey: string;
    private readonly baseUrl: string = 'https://api.themoviedb.org/3';

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.apiKey = this.configService.get<string>('TMDB_API_KEY') || '';
        if (!this.apiKey) {
            this.logger.warn('TMDB_API_KEY not found in environment variables. Calls will fail.');
        }
    }

    async searchMulti(query: string): Promise<TmdbMedia[]> {
        if (!this.apiKey) return [];

        const url = `${this.baseUrl}/search/multi`;
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<TmdbSearchResult>(url, {
                    params: {
                        api_key: this.apiKey,
                        query,
                        language: 'pt-BR',
                        include_adult: false,
                    },
                }).pipe(
                    catchError((error: AxiosError) => {
                        this.logger.error(error.response?.data || error.message);
                        throw 'An error happened!'; // Better error handling needed
                    }),
                ),
            );
            return data.results;
        } catch (error) {
            this.logger.error(`Error searching TMDB: ${error}`);
            return [];
        }
    }

    async getTrending(): Promise<TmdbMedia[]> {
        if (!this.apiKey) return []; // Mock fallback should be here

        const url = `${this.baseUrl}/trending/all/week`;
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<TmdbSearchResult>(url, {
                    params: {
                        api_key: this.apiKey,
                        language: 'pt-BR',
                    }
                })
            );
            return data.results;
        } catch (error) {
            this.logger.error(`Error fetching trending: ${error}`);
            return [];
        }
    }

    async discover(genreId?: string, providerId?: string): Promise<TmdbMedia[]> {
        if (!this.apiKey) return [];

        const url = `${this.baseUrl}/discover/movie`; // Focusing on movies for now
        const params: any = {
            api_key: this.apiKey,
            language: 'pt-BR',
            sort_by: 'popularity.desc',
            include_adult: false,
            watch_region: 'BR',
        };

        if (genreId) params.with_genres = genreId;
        if (providerId) params.with_watch_providers = providerId;

        try {
            const { data } = await firstValueFrom(
                this.httpService.get<TmdbSearchResult>(url, { params })
            );
            return data.results;
        } catch (error) {
            this.logger.error(`Error discovering content: ${error}`);
            return [];
        }
    }
}
