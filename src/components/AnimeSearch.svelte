<script lang="ts">
    import { url } from "@roxi/routify";
    import type SearchResult from "../objects/SearchResult";

    export let anime: SearchResult;
</script>

<div>
    <span>
        {anime.name} 
        <a class="text-blue-300" href={$url(`/series/${anime.id}`)}>
            /series/{anime.id}
        </a>
    </span>
</div>
