<script lang="ts">
    import type * as Api from "../../Interfaces";

    export let anime: Api.AnimeInfo;
    let clazz = "";
    export { clazz as class };

    const name = anime.name;
    const otherTitles = anime.other_titles.join(", ");
</script>

<div class="w-full {clazz}">
    <h1 class="text-size-1.75rem">{name}</h1>
    {#if otherTitles.length}
        <span class="text-size-0.75rem"> {otherTitles} </span>
    {/if}
</div>
