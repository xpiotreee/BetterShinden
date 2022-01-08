<script lang="ts">
    import Star from "@svicons/boxicons-regular/star.svelte";
    import { Circle } from "svelte-loading-spinners";
    import { goto, params, url } from "@roxi/routify";
    import { API_URL } from "../../Constants";
    import Tag from "../../components/Tag.svelte";
    import type * as Api from "../../Interfaces";
    import { tagsSettingsStore, tagsStore } from "../../stores";
    import PageSwitcher from "../../components/PageSwitcher.svelte";
    import AdvancedSearch from "../../components/AdvancedSearch.svelte";

    let tags = $tagsStore;
    $: promise = animes(
        $params.search,
        $params.page,
        $params.genres,
        $params.sort_by,
        $params.sort_order
    );
    async function animes(
        search: string,
        page: number,
        genres: string,
        sortBy: string,
        sortOrder: string
    ) {
        $tagsSettingsStore = {};
        const params = {} as { [key: string]: any };
        if (search && search.length) {
            params["search"] = search;
        }

        if (page) {
            params["page"] = page;
        }

        if (genres && genres.length) {
            params["genres"] = genres;
            genres.split(";").forEach((element) => {
                const value = element[0] === "i" ? 1 : 2;
                $tagsSettingsStore[element.substring(1)] = value;
            });
        }

        if (sortBy) {
            params["sort_by"] = sortBy;
        }

        if (sortOrder) {
            params["sort_order"] = sortOrder;
        }

        const res = await fetch(
            `${API_URL}/series?` + new URLSearchParams(params)
        );
        return await res.json();
    }

    function handleClick(anime: Api.SearchResult) {
        $goto($url(`/series/${anime.id}`));
    }
</script>

<AdvancedSearch />

{#await promise}
    <div
        class="w-full text-center flex flex-col items-center justify-center"
    >
        <Circle color="#f472b6" size="5" unit="rem" duration="1s" />
        <p class="text-1.25rem p-2">Ładowanie hińskich bajek...</p>
    </div>
{:then { page, max_page, results }}
    {#if max_page > 1}
        <PageSwitcher {page} {max_page} />
    {/if}

    <div class="flex flex-col">
        {#each results as anime}
            <a
                href={$url(`/series/${anime.id}`)}
                class="flex my-2 bg-true-gray-700 rounded-md"
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
            </a>
        {/each}
    </div>

    {#if max_page > 1}
        <PageSwitcher {page} {max_page} />
    {/if}
{/await}
