import type AnimeRating from './AnimeRating';
import type Info from './Info';
import type Stats from './Stats';
import type TagGroup from './TagsGroup';

export default interface AnimeInfo {
    id: number
    name: string
    other_titles: string[]
    description: string
    image_url: string
    tags_groups: TagGroup[]
    rating: AnimeRating
    info: Info
    stats: Stats
}