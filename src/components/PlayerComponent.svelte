<script lang="ts">
    import type Player from "../objects/Player";

    export let player: Player;
    export let handleSelect: (player: Player) => void;
</script>

<button on:click={() => handleSelect(player)} class="">
    {player.player}
    {player.quality}
</button>
