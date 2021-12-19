<script lang="ts">
    import { goto, url } from "@roxi/routify";
    import type SearchResult from "../objects/SearchResult";
    import Star from "@svicons/boxicons-regular/star.svelte";

    export let anime: SearchResult;
    function handleClick() {
        $goto($url(`/series/${anime.id}`));
    }
</script>

<button
    on:click={handleClick}
    class="flex mx-4 my-2 bg-true-gray-700 rounded-md focus:outline-none flex-grow-1"
>
    <div class="w-20.5">
        <img
            class="h-32 object-cover rounded-l-md"
            src={anime.thumbnail_url}
            alt="{anime.name} icon"
        />
    </div>
    <div class="flex flex-col justify-between h-32 w-full">
        <div class="p-2 pt-1 font-500 text-left">
            <span>{anime.name}</span>
            <div class="float-right text-center pt-1">
                <span class='align-top'>{anime.rating.top}</span>
                <Star class='w-6 fill-amber-400'/>
            </div>
            <div class="text-0.8rem py-1">
                <span>{anime.type} {anime.status}</span>
            </div>
            <div class="text-0.8rem py-1">
                <span>{anime.episodes_count}</span>
                <span class="font-400"> odcinków</span>
            </div>
        </div>
        <div class="flex flex-wrap text-0.8rem p-1 text-left align-text-bottom">
            {#each anime.tags as tag}
                <a class="p-1 m-0.75 rounded-md border-pink-400 border-1" href=" "
                    >{tag}</a
                >
            {/each}
        </div>
    </div>
</button>
