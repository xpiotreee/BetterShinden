<script lang="ts">
    import Star from "@svicons/boxicons-regular/star.svelte";
    import { goto, params, ready, url } from "@roxi/routify";
    import { API_URL } from "../../Constants";
    import Tag from "../../components/Tag.svelte";
    import type * as Api from "../../Interfaces";
    import { tagsSettingsStore, tagsStore } from "../../stores";
    import PageSwitcher from "../../components/PageSwitcher.svelte";
    import AdvancedSearch from '../../components/AdvancedSearch.svelte';

    let tags = $tagsStore;
    let searchData: Api.SearchResponse;
    $: animes($params.search, $params.page, $params.genres, $params.sort_by, $params.sort_order);
    function animes(search: string, page: number, genres: string, sortBy: string, sortOrder: string) {
        const params = {} as { [key: string]: any };
        if (search && search.length) {
            params["search"] = search;
        }

        if (page) {
            params["page"] = page;
        }

        if (genres && genres.length) {
            params["genres"] = genres;
            genres.split(';').forEach(element => {
                const value = element[0] === 'i' ? 1 : 2
                $tagsSettingsStore[element.substring(1)] = value;
            });
        }

        if (sortBy) {
            params["sort_by"] = sortBy;
        }

        if (sortOrder) {
            params["sort_order"] = sortOrder;
        }

        fetch(`${API_URL}/series?` + new URLSearchParams(params))
            .then((response) => response.json())
            .then((json) => {
                searchData = json;
            });
    }

    function handleClick(anime: Api.SearchResult) {
        $goto($url(`/series/${anime.id}`));
    }
</script>


<AdvancedSearch />

{#if searchData && searchData.max_page > 1}
    <PageSwitcher {...searchData} />
{/if}

<div class="flex flex-col">
    {#each searchData ? searchData.results : [] as anime}
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
                    <span> {anime.name} </span>
                    <div class="float-right text-center pt-1">
                        <span class="align-top"> {anime.rating.top} </span>
                        <Star class="w-6 fill-amber-400" />
                    </div>
                    <div class="text-0.8rem py-1">
                        <span> {anime.type} {anime.status} </span>
                    </div>
                    <div class="text-0.8rem py-1">
                        <span> {anime.episodes_count} </span>
                        <span class="font-400"> odcinków </span>
                    </div>
                </div>
                <div
                    class="flex flex-wrap text-0.8rem p-1 text-left align-text-bottom"
                >
                    {#each anime.tags as tag}
                        <Tag tag={tags[tag]} />
                    {/each}
                </div>
            </div>
        </button>
    {/each}
</div>

{#if searchData && searchData.max_page > 1}
    <PageSwitcher {...searchData} />
{/if}