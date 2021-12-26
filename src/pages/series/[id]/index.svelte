<script lang="ts">
    import { Episode } from "../../../components/anime";
    import { params } from "@roxi/routify";
    import Tag from "../../../components/Tag.svelte";
    import { animeStore, episodesStore, tagsStore } from "../../../stores";

    let anime = $animeStore;
    let episodes = $episodesStore;
    let tags = $tagsStore;
    $: episodes = $episodesStore;
    const tagsGroups = [
        ["genre", "Gatunki"],
        ["target_group", "Grupy docelowe"],
        ["tag", "Pozostałe tagi"],
        ["entity", "Rodzaje postaci"],
        ["place", "Miejsce i czas"],
        ["source", "Pierwowzór"],
    ];
</script>

<div class="container">
    <span>{anime.description || "Brak opisu."}</span>
</div>

<div class="container">
    {#if !anime.tags.length}
        <span> Brak tagów </span>
    {/if}
    {#each tagsGroups as [type, label]}
        <div class="flex flex-wrap items-center">
            <span class="font-500 w-full p-0.75"> {label}: </span>
            {#each anime.tags.filter((tag) => tags[tag].type == type) as tag}
                <Tag tag={tags[tag]} />
            {/each}
            <br />
        </div>
    {/each}
</div>

<div class="m-2 p-1 w-full max-h-80 rounded-lg bg-true-gray-700">
    <div
        class="flex my-2 pl-2 pr-1 w-full max-h-75 flex-col gap-2 overflow-y-scroll rounded-lg bg-true-gray-700"
    >
        {#each episodes as episode}
            <Episode anime={$params.id} {episode} />
        {/each}
    </div>
</div>

<style>
    ::-webkit-scrollbar-track {
        background: rgb(64, 64, 64);
    }

    .container {
        @apply p-2 m-2 rounded-lg bg-true-gray-700;
    }
</style>
