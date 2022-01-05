<script lang="ts">
    import { params } from "@roxi/routify";
    import { API_URL } from "../../../Constants";
    import type * as Api from "../../../Interfaces";
    import { Title, Rating, Stats, Info } from "../../../components/anime";
    import { animeStore, episodesStore } from "../../../stores";

    let anime: Api.AnimeInfo;
    $: getInfo($params.id);
    function getInfo(id: string) {
        if (anime && anime.id == parseInt(id)) {
            return;
        }

        fetch(`${API_URL}/series/${id}`)
            .then((result) => result.json())
            .then((result) => {
                $animeStore = result;
                anime = result;
            });
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

{#if anime}
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
{/if}

<style>
    .container {
        @apply p-2 m-2 rounded-lg bg-true-gray-700;
    }
</style>
