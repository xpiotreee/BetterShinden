<script lang="ts">
    import { params, ready } from "@roxi/routify";
    import type Player from "../../objects/Player";
    import { API_URL } from "../../Constants";
    import PlayerComponent from "../../components/PlayerComponent.svelte";

    let playerIframe: string = "";
    let players: Player[] = [];
    $: getPlayers($params.id);
    function getPlayers(id: string) {
        fetch(`${API_URL}/players/${id}`)
            .then((result) => result.json())
            .then((result) => {
                players = result as Player[];
                $ready();
            });
    }

    function handleSelect(player: any) {
        fetch(`${API_URL}/player/${player.id}`)
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
    <p>Lista odtwarzaczy</p>
    {#each players as player}
        <PlayerComponent {player} {handleSelect} /> <br />
    {/each}
</div>
