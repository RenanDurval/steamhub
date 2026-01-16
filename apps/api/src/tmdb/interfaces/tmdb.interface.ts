export interface TmdbMovieConfig {
    apiKey: string;
    baseUrl: string;
}

export interface TmdbSearchResult {
    page: number;
    results: TmdbMedia[];
    total_pages: number;
    total_results: number;
}

export interface TmdbMedia {
    id: number;
    title?: string;
    name?: string; // TV Shows use 'name' instead of 'title'
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    media_type: 'movie' | 'tv';
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
}
