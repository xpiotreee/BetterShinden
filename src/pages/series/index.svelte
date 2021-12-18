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
    <span>Wyniki wyszukiwania dla: {$params.query}</span>
{/if}

{#each series as anime}
    <AnimeSearch {anime} />
{/each}
