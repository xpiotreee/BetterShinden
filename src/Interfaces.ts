export interface TagGroup {
    name: string;
    tags: string[];
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
    tags_groups: TagGroup[];
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