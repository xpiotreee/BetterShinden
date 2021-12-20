<script lang="ts">
    import { url } from "@roxi/routify";

    import Search from "./Search.svelte";
</script>

<nav class="bg-true-gray-700 p-2 flex">
    <div class="container ml-2 mr-auto">
        <a href={$url("/")} class="font-600 mr-2">LepszyShinden</a>
        <a href={$url("/series")}>Anime</a>
    </div>
    <Search />
</nav>
