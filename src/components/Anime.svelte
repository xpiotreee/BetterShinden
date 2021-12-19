<script lang="ts">
    import type AnimeInfo from "../objects/AnimeInfo";
    import Star from "@svicons/boxicons-regular/star.svelte";

    export let info: AnimeInfo;
</script>

<div class="p-2 pb-0">
    <h1 class="mx-1 text-size-1.75rem">{info.name}</h1>
    <span class="mx-1 text-size-0.75rem">{info.other_titles.join(", ")}</span>
</div>
<div class="flex p-1 ">
    <div class="m-2 w-1/5 rounded-xl bg-true-gray-700 flex-shrink-0 ">
        <img class="rounded-t-xl w-full" src={info.image_url} alt="icon" />
        <div class="p-1 font-500 text-center">
            <span class="align-top">{info.rating.total}/10</span>
            <Star class="w-6 fill-amber-400" /><br />
            <span class="text-size-0.8rem align-top">
                {info.rating.count}
            </span>
            <span class="font-400 text-size-0.8rem align-top"> głosów </span>
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
                    <span class="text-size-0.8rem font-400"> Postacie </span>
                </li>
            </ul>
            <span>Informacje</span>
            <div class="text-left p-2 pt-0">
                <span class="font-400">Typ: </span>
                <span>{info.info.type}</span><br />
                <span class="font-400">Status: </span>
                <span>{info.info.status}</span><br />
                {#if info.info.start_airing}
                    <span class="font-400">Data emisji: </span>
                    <span>{new Date(info.info.start_airing).toLocaleDateString('pl-PL')}</span><br />
                {/if}
                {#if info.info.end_airing}
                    <span class="font-400">Data emisji: </span>
                    <span>{new Date(info.info.end_airing).toLocaleDateString('pl-PL')}</span><br />
                {/if}
                <span class="font-400">Liczba odcinków: </span>
                <span>{info.info.episode_count}</span><br />
                <span class="font-400">Studio: </span>
                <span>{info.info.studios.join(', ')}</span><br />
                <span class="font-400">Długość odcinka: </span>
                <span>{info.info.episode_length}min</span><br />
                <span class="font-400">MPAA: </span>
                <span>{info.info.mpaa}</span><br />
            </div>
        </div>
    </div>
    <div class="m-2 p-2 rounded-xl bg-true-gray-700 w-full">
        <span>{info.description}</span>
    </div>
</div>
