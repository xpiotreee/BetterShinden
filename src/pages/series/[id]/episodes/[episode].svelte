<script lang="ts">
    import { goto, params, ready, url } from "@roxi/routify";
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
    $: getPlayers($params.episode);
    function getPlayers(id: number) {
        fetch(`${API_URL}/players/${id}`)
            .then((result) => result.json())
            .then((result) => {
                players = result;
                $ready();
            });
    }

    let playerIframe = "";
    function getPlayer(id: number) {
        fetch(`${API_URL}/player/${id}`)
            .then((result) => result.text())
            .then((result) => {
                playerIframe = result.replace(
                    'width="800" height="450"',
                    'style="border:none;width:100%;height:100%;aspect-ratio:16/9;"'
                );
            });
    }

    function handleClick(direction: number) {
        const index = episode.index - 1 + direction;
        if (!$episodesStore[index]) {
            return;
        }

        players = [];
        playerIframe = "";
        episode = $episodesStore[index];
        $goto($url(`./${episode.id}`));
    }
</script>

<div class="p-2 w-full">
    {#if episode}
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
            {@html playerIframe}
        </div>
    {/if}
    <div class="grid grid-cols-2 gap-2 w-full">
        {#each players as { id, quality, player, upload_date, audio, subs }}
            <button
                class="flex p-2 bg-true-gray-700 rounded-lg text-left"
                on:click={() => getPlayer(id)}
            >
                <div class="w-full">
                    <span class="font-500">
                        {quality}
                        {player}
                    </span><br />
                    <span>{new Date(upload_date).toLocaleString("pl-PL")}</span>
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
