<script lang="ts">
    import { url } from "@roxi/routify";
    import type * as Api from "../../Interfaces";

    export let episode: Api.Episode;
    export let anime: number;
</script>

<a
    href={$url(`/series/${anime}/episodes/${episode.id}`)}
    class="p-2 w-full border-pink-400 border-1 rounded-md max-h-min"
>
    {episode.index}. {episode.title || "Brak tytułu"}
</a>
