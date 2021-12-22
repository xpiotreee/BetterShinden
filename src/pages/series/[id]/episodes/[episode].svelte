<script lang="ts">
    import { params, ready, url } from "@roxi/routify";
    import type * as Api from "../../../../Interfaces";
    import { API_URL } from "../../../../Constants";

    let playerIframe = "";

    let players = [] as Api.Player[];
    $: getPlayers($params.episode);
    function getPlayers(id: number) {
        fetch(`${API_URL}/players/${id}`)
            .then((result) => result.json())
            .then((result) => {
                players = result;
                $ready();
            });
    }

    function getPlayer(id: number) {
        fetch(`${API_URL}/player/${id}`)
            .then((result) => result.text())
            .then((result) => {
                playerIframe = result;
            });
    }
</script>

<div class="text-center">
    {#if playerIframe}
        <div>
            {@html playerIframe}
        </div>
    {/if}

    {#each players as player}
        <button on:click={() => getPlayer(player.id)}>
            {player.player}
            {player.quality}
        </button><br>
    {/each}
</div>
