export interface Tag {
    type: string;
    name: string;
    description: string;
}

export interface SearchRating {
    total: number;
    plot: number;
    graphics: number;
    music: number;
    characters: number;
    top: number;
}

export interface SearchResult {
    id: number;
    name: string;
    type: string;
    episodes_count: number;
    status: string;
    tags: string[];
    thumbnail_url: string;
    rating: SearchRating;
}

export interface SearchResponse {
    page: number;
    max_page: number;
    results: SearchResult[];
}

export interface AnimeRating {
    total: number;
    count: number;
    plot: number;
    graphics: number;
    music: number;
    characters: number;
}

export interface Info {
    type: string;
    status: string;
    start_airing: number;
    end_airing: number;
    episode_count: number;
    studios: string[];
    episode_length: number;
    mpaa: number;
}

export interface Stats {
    watching: number;
    watched: number;
    skipped: number;
    paused: number;
    dropped: number;
    planning: number;
    liked: number;
}

export interface AnimeInfo {
    id: number;
    name: string;
    other_titles: string[];
    description: string;
    image_url: string;
    tags: string[];
    rating: AnimeRating;
    info: Info;
    stats: Stats;
}

export interface Episode {
    id: number;
    index: number;
    title: string;
    online: boolean;
    filler: boolean;
    languages: string[];
    airing_date: number;
}

export interface Player {
    id: number;
    player: string;
    quality: string;
    audio: string;
    subs: string;
    upload_date: number
}