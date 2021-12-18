<script lang="ts">
    import { url } from "@roxi/routify";
    import type Episode from "../objects/Episode";

    export let episode: Episode;
</script>

<a href={$url(`/episode/${episode.id}`)}>
    {episode.index}. {episode.title}
</a>
