<script lang="ts">
    import SortDown from "@svicons/boxicons-regular/sort-down.svelte";
    import SortUp from "@svicons/boxicons-regular/sort-up.svelte";
    import TagCheckbox from "./TagCheckbox.svelte";
    import { tagsSettingsStore, tagsStore } from "../stores";
    import { goto, params, url } from "@roxi/routify";

    let current = "genre";
    let sorting = '';
    let descending = true;
    let search = $params.search;
    $: tags = Object.values($tagsStore).filter((tag) => tag.type == current);

    const tagsGroups = [
        ["genre", "Gatunki"],
        ["target_group", "Grupy docelowe"],
        ["tag", "Pozostałe tagi"],
        ["entity", "Rodzaje postaci"],
        ["place", "Miejsce i czas"],
        ["source", "Pierwowzór"],
    ];

    const sortingOptions = [
        ['desc', 'Nazwa'],
        ['type', 'Typ'],
        ['multimedia', 'Epizody'],
        ['status', 'Status'],
        ['ranking-rate', 'Ocena']
    ]

    function handleSubmit() {
        const params = {} as { [key: string]: any };
        const genres = Object.entries($tagsSettingsStore)
            .map(([tag, value]) => {
                switch (value) {
                    default:
                        return undefined;
                    case 1:
                        return `i${tag}`;
                    case 2:
                        return `e${tag}`;
                }
            })
            .filter((e) => e)
            .join(";");

        if (genres.length) {
            params["genres"] = genres;
        }

        if (search && search.length) {
            params["search"] = search;
        }

        if (sorting.length) {
            params["sort_by"] = sorting;
            params["sort_order"] = descending ? 'desc' : 'asc'
        }

        $goto($url("./"), params);
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="w-full flex gap-2">
    <input
        bind:value={search}
        placeholder="Szukaj..."
        class="bg-true-gray-600 p-0.5 pl-2 w-2/3 rounded-lg focus:outline-none"
    />
    <button class="align-middle p-1 bg-true-gray-600 rounded-lg">
        Szukaj
    </button>
    <select bind:value={sorting} on:change={handleSubmit} class="bg-true-gray-600 rounded-lg ml-auto focus:outline-none">
        <option hidden value=""> Sortowanie </option>
        {#each sortingOptions as [sorting, label]}
            <option value={sorting}> {label} </option>
        {/each}
    </select>
    <button disabled={!sorting.length} on:click={() => descending = !descending}>
        <svelte:component this={descending ? SortDown : SortUp} class="w-8 align-bottom bg-true-gray-600 rounded-full"/>
    </button>
</form>

<div class="grid grid-cols-5 my-2 p-2 gap-1 bg-true-gray-700 rounded-lg w-full">
    <div class="flex gap-4 col-span-5">
        {#each tagsGroups as [type, label]}
            <button
                on:click={() => (current = type)}
                class:bg-true-gray-600={current == type}
                class="rounded-lg p-1"
            >
                {label}
            </button>
        {/each}
    </div>
    {#each tags as tag}
        <TagCheckbox {tag} />
    {/each}
</div>

<style>
    button {
        @apply focus:outline-none;
    }
</style>
