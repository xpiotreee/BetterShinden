<script lang="ts">
    import { params, ready, url } from "@roxi/routify";
    import { onMount } from "svelte";
    import { API_URL } from "../../../../Constants";
    import { Episode } from '../../../../components/anime'
    import type * as Api from "../../../../Interfaces";

    let episodes = [] as Api.Episode[];
    onMount(() => {
        fetch(`${API_URL}/series/${$params.id}/episodes`)
            .then((result) => result.json())
            .then((result) => {
                episodes = result;
            });
    });
</script>

{#each episodes as episode}
    <Episode anime={$params.id} {episode} /> <br />
{/each}
