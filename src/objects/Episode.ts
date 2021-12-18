export default interface Episode {
    id: number
    index: number
    title: string
    online: boolean
    filler: boolean
    languages: string[]
    airing_date: number
}