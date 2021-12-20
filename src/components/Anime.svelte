<script lang="ts">
    import type AnimeInfo from "../objects/AnimeInfo";
    import type Episode from "../objects/Episode";
    import Star from "@svicons/boxicons-regular/star.svelte";
    import EpisodeComponent from "./EpisodeComponent.svelte";

    export let info: AnimeInfo;
    export let episodes: Episode[];
</script>

<div class="p-2 pb-0">
    <h1 class="mx-1 text-size-1.75rem">{info.name}</h1>
    {#if info.other_titles.length}
        <span class="mx-1 text-size-0.75rem"
            >{info.other_titles.join(", ")}</span
        >
    {/if}
</div>
<div class="flex p-1 ">
    <div class="m-2 w-1/4">
        <div class="rounded-xl bg-true-gray-700">
            <img class="rounded-t-xl w-full" src={info.image_url} alt="icon" />
            <div class="p-1 font-500 text-center">
                <span class="align-top">{info.rating.total}/10</span>
                <Star class="w-6 fill-amber-400" /><br />
                <span class="text-size-0.8rem align-top">
                    {info.rating.count}
                </span>
                <span class="font-400 text-size-0.8rem align-top">
                    głosów
                </span>
                <ul class="whitespace-nowrap">
                    <li class="p-2 inline-block">
                        <span>{info.rating.plot}</span> <br />
                        <span class="text-size-0.8rem font-400"> Fabuła </span>
                    </li>
                    <li class="p-2 inline-block">
                        <span>{info.rating.graphics}</span> <br />
                        <span class="text-size-0.8rem font-400"> Grafika </span>
                    </li>
                    <li class="p-2 inline-block">
                        <span>{info.rating.music}</span> <br />
                        <span class="text-size-0.8rem font-400"> Muzyka </span>
                    </li>
                    <li class="p-2 inline-block">
                        <span>{info.rating.characters}</span> <br />
                        <span class="text-size-0.8rem font-400">
                            Postacie
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div
            class="p-4 pt-2 my-4 font-500 text-left rounded-xl bg-true-gray-700"
        >
            <div class="text-center">
                <span> Statystyki </span>
            </div>
            <span class="font-400"> Ogląda: </span>
            <span> {info.stats.watching} </span> <br />
            <span class="font-400"> Obejrzało: </span>
            <span> {info.stats.watched} </span> <br />
            <span class="font-400"> Pominęło: </span>
            <span> {info.stats.skipped} </span> <br />
            <span class="font-400"> Wstrzymało: </span>
            <span> {info.stats.paused} </span> <br />
            <span class="font-400"> Porzuciło: </span>
            <span> {info.stats.dropped} </span> <br />
            <span class="font-400"> Planuje: </span>
            <span> {info.stats.planning} </span> <br />
            <span class="font-400"> Lubi: </span>
            <span> {info.stats.liked} </span> <br />
        </div>
        <div
            class="p-4 pt-2 my-2 font-500 text-left rounded-xl bg-true-gray-700"
        >
            <div class="text-center">
                <span> Informacje </span>
            </div>
            <span class="font-400">Typ: </span>
            <span>{info.info.type}</span><br />
            <span class="font-400">Status: </span>
            <span>{info.info.status}</span><br />
            {#if info.info.start_airing}
                <span class="font-400">Data emisji: </span>
                <span
                    >{new Date(info.info.start_airing).toLocaleDateString(
                        "pl-PL"
                    )}</span
                ><br />
            {/if}
            {#if info.info.end_airing}
                <span class="font-400">Koniec emisji: </span>
                <span
                    >{new Date(info.info.end_airing).toLocaleDateString(
                        "pl-PL"
                    )}</span
                ><br />
            {/if}
            <span class="font-400">Liczba odcinków: </span>
            <span>{info.info.episode_count}</span><br />
            <span class="font-400">Studio: </span>
            <span>{info.info.studios.join(", ")}</span><br />
            <span class="font-400">Długość odcinka: </span>
            <span>{info.info.episode_length}min</span><br />
            <span class="font-400">MPAA: </span>
            <span>{info.info.mpaa}</span><br />
        </div>
    </div>

    <div class="w-full">
        <div class="p-3 m-2 rounded-xl bg-true-gray-700">
            <span>{info.description || "Brak opisu."}</span>
        </div>
        <div class="p-3 mx-2 my-4 rounded-xl bg-true-gray-700">
            {#each info.tags_groups as group}
                <div class="flex flex-wrap items-center">
                    <span class="font-500 w-full p-0.75">{group.name}: </span>
                    {#each group.tags as tag}
                        <a
                            class="p-1 m-0.75 rounded-md border-pink-400 border-1"
                            href=" "
                            >{tag}
                        </a>
                    {/each}
                    <br />
                </div>
            {/each}
        </div>
        <div class="p-3 pr-1 m-2 max-h-80 rounded-xl bg-true-gray-700">
            <div class="max-h-75 pr-1 bg-true-gray-700 overflow-y-scroll">
                {#each episodes as episode}
                    <EpisodeComponent {episode} /> <br />
                {/each}
            </div>
        </div>
        
    </div>
</div>

<style>
::-webkit-scrollbar-track {
  background: rgb(64, 64, 64);
}
</style>
