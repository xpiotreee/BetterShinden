<script lang="ts">
    import type * as Api from "../../Interfaces";

    export let anime: Api.AnimeInfo;

    const { watching, watched, skipped, paused, dropped, planning, liked } = anime.stats;
    const stats = [
        ["Ogląda", watching],
        ["Obejrzało", watched],
        ["Pominęło", skipped],
        ["Wstrzymało", paused],
        ["Porzuciło", dropped],
        ["Planuje", planning],
        ["Lubi", liked],
    ];
</script>

<div class="text-center">
    <span> Statystyki </span>
</div>
{#each stats as [label, value]}
    <span class="font-400"> {label}: </span>
    <span> {value} </span> <br />
{/each}