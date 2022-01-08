<script lang="ts">
    import { params } from "@roxi/routify";
    import { API_URL } from "../../../Constants";
    import type * as Api from "../../../Interfaces";
    import { Title, Rating, Stats, Info } from "../../../components/anime";
    import { Circle } from "svelte-loading-spinners";
    import { animeStore, episodesStore } from "../../../stores";

    let anime: Api.AnimeInfo;
    let promise = getInfo($params.id);
    async function getInfo(id: string) {
        if (anime && anime.id == parseInt(id)) {
            return;
        }

        const res = await fetch(`${API_URL}/series/${id}`);
        const data = await res.json();
        $animeStore = data;
        anime = data;
        return data;
    }

    $: getEpisodes($params.id);
    function getEpisodes(id: string) {
        if (anime && anime.id == parseInt(id)) {
            return;
        }

        fetch(`${API_URL}/series/${id}/episodes`)
            .then((result) => result.json())
            .then((result) => {
                $episodesStore = result;
            });
    }
</script>

{#await promise}
    <div
        class="absolute top-0 left-0 w-full h-full text-center flex flex-col items-center justify-center"
    >
        <Circle color="#f472b6" size="5" unit="rem" duration="1s" />
        <p class="text-1.25rem p-2"> Ładowanie hińskiej bajki... </p>
    </div>
{:then anime}
    <Title class="p-2 pb-0" {anime} />
    <div class="grid grid-cols-4 gap-2">
        <div>
            <img
                class="m-2 w-full rounded-lg"
                src={anime.image_url}
                alt="icon"
            />
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

        <div class="col-span-3">
            <slot {anime} />
        </div>
    </div>
{/await}

<style>
    .container {
        @apply p-2 m-2 rounded-lg bg-true-gray-700;
    }
</style>
