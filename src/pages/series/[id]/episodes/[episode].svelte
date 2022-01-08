<script lang="ts">
    import { goto, params, ready, url } from "@roxi/routify";
    import { Circle } from "svelte-loading-spinners";
    import Headphone from "@svicons/boxicons-regular/headphone.svelte";
    import Text from "@svicons/boxicons-regular/text.svelte";
    import X from "@svicons/boxicons-regular/x.svelte";
    import Left from "@svicons/boxicons-regular/chevron-left.svelte";
    import Right from "@svicons/boxicons-regular/chevron-right.svelte";
    import type * as Api from "../../../../Interfaces";
    import { API_URL } from "../../../../Constants";
    import { episodesStore } from "../../../../stores";

    $: episode = $episodesStore.find(
        (episode) => episode.id == parseInt($params.episode)
    ) as Api.Episode;

    let players = [] as Api.Player[];
    $: promise = getPlayers($params.episode);
    async function getPlayers(id: number) {
        const res = await fetch(`${API_URL}/players/${id}`);
        const data = await res.json();
        players = data;
        return data;
    }

    let playerIframe: Promise<String> | undefined;
    async function getPlayer(id: number) {
        const res = await fetch(`${API_URL}/player/${id}`);
        const data = await res.text();
        return data.replace(
            'width="800" height="450"',
            'style="border:none;width:100%;height:100%;aspect-ratio:16/9;"'
        );
    }

    function handleClick(direction: number) {
        const index = episode.index - 1 + direction;
        if (!$episodesStore[index]) {
            return;
        }

        players = [];
        playerIframe = undefined;
        episode = $episodesStore[index];
        $goto($url(`./${episode.id}`));
    }
</script>

<div class="p-2 w-full">
    {#if episode && players.length}
        <div class="pb-2">
            <a href={$url("../")}>
                <X class="w-8 align-bottom bg-true-gray-700 rounded-full" />
            </a>
            <span class="text-size-1.75rem font-500">
                {episode.index}. {episode.title || "Brak tytułu"}
            </span>
            <div class="float-right">
                <button on:click={() => handleClick(-1)}>
                    <Left
                        class="w-8 align-bottom bg-true-gray-700 rounded-full"
                    />
                </button>
                <button on:click={() => handleClick(1)}>
                    <Right
                        class="w-8 align-bottom bg-true-gray-700 rounded-full"
                    />
                </button>
            </div>
        </div>
    {/if}

    {#if playerIframe}
        <div class="player-container">
            {#await playerIframe}
                <div
                    class="w-full h-full text-center flex flex-col items-center justify-center"
                >
                    <Circle color="#f472b6" size="5" unit="rem" duration="1s" />
                    <p class="text-1.25rem p-2">Ładowanie odtwarzacza...</p>
                </div>
            {:then player}
                {@html player}
            {/await}
        </div>
    {/if}

    {#await promise}
        <div
            class="w-full text-center flex flex-col items-center justify-center"
        >
            <Circle color="#f472b6" size="5" unit="rem" duration="1s" />
            <p class="text-1.25rem p-2">Ładowanie odtwarzaczy...</p>
        </div>
    {:then players}
        <div class="grid grid-cols-2 gap-2 w-full">
            {#each players as { id, quality, player, upload_date, audio, subs }}
                <button
                    class="flex p-2 bg-true-gray-700 rounded-lg text-left"
                    on:click={() => playerIframe = getPlayer(id)}
                >
                    <div class="w-full">
                        <span class="font-500">
                            {quality}
                            {player}
                        </span><br />
                        <span>
                            {new Date(upload_date).toLocaleString("pl-PL")}
                        </span>
                    </div>
                    <div class="text-right w-full">
                        <Headphone class="w-6" />
                        <span
                            class="pt-3 flag-icon flag-icon-{audio.replace(
                                'en',
                                'gb'
                            )}"
                        /><br />
                        <Text class="w-6" />
                        <span
                            class="pt-3 flag-icon flag-icon-{subs.replace(
                                'en',
                                'gb'
                            )}"
                        />
                    </div>
                </button>
            {/each}
        </div>
    {/await}
</div>

<style>
    button {
        @apply outline-none;
    }
    .player-container {
        width: 100%;
        height: 100%;
        aspect-ratio: 16/9;
    }
</style>
