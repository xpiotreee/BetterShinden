<script lang="ts">
    import Star from "@svicons/boxicons-regular/star.svelte";
    import type * as Api from "../../Interfaces";

    export let anime: Api.AnimeInfo;

    const { total, count, plot, graphics, music, characters } = anime.rating;
    const rating = [
        ["Fabuła", plot],
        ["Grafika", graphics],
        ["Muzyka", music],
        ["Postacie", characters],
    ];
</script>

<div class="font-500 text-center">
    <span class="align-top"> {total}/10 </span>
    <Star class="w-6 fill-amber-400" /><br />
    <span class="text-size-0.8rem align-top">
        {count}
    </span>
    <span class="font-400 text-size-0.8rem align-top"> głosów </span>
    <ul class="whitespace-nowrap">
        {#each rating as [label, value]}
            <li class="p-2 inline-block">
                <span> {value} </span> <br />
                <span class="text-size-0.8rem font-400"> {label} </span>
            </li>
        {/each}
    </ul>
</div>
