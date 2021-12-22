<script lang="ts">
    import Star from "@svicons/boxicons-regular/star.svelte";
    import { goto, params, ready, url } from "@roxi/routify";
    import { API_URL } from "../../Constants";
    import Tag from "../../components/Tag.svelte";

    interface SearchRating {
        total: number;
        plot: number;
        graphics: number;
        music: number;
        characters: number;
        top: number;
    }

    interface SearchResult {
        id: number;
        name: string;
        type: string;
        episodes_count: number;
        status: string;
        tags: string[];
        thumbnail_url: string;
        rating: SearchRating;
    }

    let series = [] as SearchResult[];
    $: animes($params.query);
    function animes(query?: string) {
        let url = `${API_URL}/series`;
        if (query) {
            url += `?q=${query}`;
        }

        series = [];
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                series = json;
                $ready();
            });
    }

    function handleClick(anime: SearchResult) {
        $goto($url(`/series/${anime.id}`));
    }
</script>

{#if $params.query}
    <div class="text-size-1.5rem">
        <span>Wyniki wyszukiwania dla: </span>
        <span class="font-500">{$params.query}</span>
    </div>
{/if}

<div class="flex flex-col">
    {#each series as anime}
        <button
            on:click={() => handleClick(anime)}
            class="flex my-2 bg-true-gray-700 rounded-md focus:outline-none flex-grow-1"
        >
            <div class="w-20.5">
                <img
                    class="h-32 object-cover rounded-l-md"
                    src={anime.thumbnail_url}
                    alt="{anime.name} icon"
                />
            </div>

            <div class="flex flex-col justify-between h-32 w-full">
                <div class="p-2 pt-1 font-500 text-left">
                    <span>{anime.name}</span>
                    <div class="float-right text-center pt-1">
                        <span class="align-top">{anime.rating.top}</span>
                        <Star class="w-6 fill-amber-400" />
                    </div>
                    <div class="text-0.8rem py-1">
                        <span>{anime.type} {anime.status}</span>
                    </div>
                    <div class="text-0.8rem py-1">
                        <span>{anime.episodes_count}</span>
                        <span class="font-400"> odcinków</span>
                    </div>
                </div>
                <div class="flex flex-wrap text-0.8rem p-1 text-left align-text-bottom">
                    {#each anime.tags as tag}
                        <Tag name={tag} />
                    {/each}
                </div>
            </div>
        </button>
    {/each}
</div>
