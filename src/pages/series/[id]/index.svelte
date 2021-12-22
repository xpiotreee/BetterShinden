<script lang="ts">
    import {
        Title,
        Rating,
        Episode,
        Stats,
        Info,
    } from "../../../components/anime";
    import { params } from "@roxi/routify";
    import { API_URL } from "../../../Constants";
    import type * as Api from "../../../Interfaces";
    import Tag from "../../../components/Tag.svelte";

    let anime: Api.AnimeInfo;
    $: getInfo($params.id);
    function getInfo(id: string) {
        fetch(`${API_URL}/series/${id}`)
            .then((result) => result.json())
            .then((result) => {
                anime = result;
            });
    }

    let episodes = [] as Api.Episode[];
    $: getEpisodes($params.id);
    function getEpisodes(id: string) {
        fetch(`${API_URL}/series/${id}/episodes`)
            .then((result) => result.json())
            .then((result) => {
                episodes = result;
            });
    }
</script>

{#if anime}
    <Title class='mx-2' {anime} />
    <div class="flex gap-2">
        <div class="w-1/4">
            <img class="m-2 w-full rounded-lg" src={anime.image_url} alt="icon" />
            <div class="container">
                <Rating {anime} />
            </div>
            <div class="container font-500 text-left">
                <Stats {anime} />
            </div>
            <div class="container font-500 text-left">
                <Info {anime} />
            </div>
        </div>

        <div class="w-full">
            <div class="container">
                <span>{anime.description || "Brak opisu."}</span>
            </div>

            <div class="container">
                {#if !anime.tags_groups.length}
                    <span> Brak tagów </span>
                {/if}
                {#each anime.tags_groups as { name, tags }}
                    <div class="flex flex-wrap items-center">
                        <span class="font-500 w-full p-0.75"> {name}: </span>
                        {#each tags as tag}
                            <Tag name={tag} />
                        {/each}
                        <br />
                    </div>
                {/each}
            </div>

            <div class="pt-1 max-h-80 container">
                <div class="max-h-75 overflow-y-scroll">
                    {#each episodes as episode}
                        <Episode anime={$params.id} {episode} /> <br />
                    {/each}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    ::-webkit-scrollbar-track {
        background: rgb(64, 64, 64);
    }

    .container {
        @apply p-2 m-2 rounded-lg bg-true-gray-700;
    }
</style>
