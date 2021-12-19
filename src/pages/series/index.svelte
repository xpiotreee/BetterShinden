<script lang="ts">
    import type SearchResult from "../../objects/SearchResult";
    import { params, ready } from "@roxi/routify";
    import AnimeSearch from "../../components/AnimeSearch.svelte";
    import { API_URL } from "../../Constants";

    let series: SearchResult[] = [];
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
                series = json as SearchResult[];
                $ready();
            });
    }
</script>

{#if $params.query}
<div class="m-4 mb-2 text-size-1.5rem">
    <span>Wyniki wyszukiwania dla: </span>
    <span class="font-500">{$params.query}</span>
</div>
    
{/if}

<div class="flex flex-col py-2">
    {#each series as anime}
        <AnimeSearch {anime} />
    {/each}
</div>
