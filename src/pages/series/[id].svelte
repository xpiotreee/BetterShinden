<script lang="ts">
    import { params } from "@roxi/routify";
    import Anime from "../../components/Anime.svelte";
    import EpisodeComponent from "../../components/EpisodeComponent.svelte";
    import { API_URL } from "../../Constants";
    import type AnimeInfo from "../../objects/AnimeInfo";
    import type Episode from "../../objects/Episode";

    let info: AnimeInfo;
    $: getInfo($params.id);
    function getInfo(id: string) {
        fetch(`${API_URL}/series/${id}`)
            .then((result) => result.json())
            .then((result) => {
                info = result as AnimeInfo;
            });
    }

    let episodes: Episode[] = [];
    $: getEpisodes($params.id);
    function getEpisodes(id: string) {
        fetch(`${API_URL}/series/${id}/episodes`)
            .then((result) => result.json())
            .then((result) => {
                episodes = result as Episode[];
            });
    }
</script>

{#if info}
    <Anime {info} />
    <div class="text-center">
        <p>List odcinków</p>
        {#each episodes as episode}
            <EpisodeComponent {episode} /> <br />
        {/each}
    </div>
{/if}
