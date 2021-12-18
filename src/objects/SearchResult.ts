import type SearchRating from './SearchRating';

export default interface SearchResult {
    id: number
    name: string
    type: string
    episodes_count: number
    status: string
    tags: string[]
    thumbnail_url: string
    rating: SearchRating
}