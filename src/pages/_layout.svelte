<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import { API_URL } from "../Constants";
    import { tagsStore } from "../stores";
    import { onMount } from "svelte";
    import { ready } from "@roxi/routify";

    onMount(() => {
        fetch(`${API_URL}/tags.json`)
            .then((res) => res.json())
            .then((res) => {
                $tagsStore = res;
                $ready;
            });
    });
</script>

<div class="bg-true-gray-800 text-true-gray-100 min-h-screen overflow-hidden">
    <Navbar />
    <div class="grid grid-cols-[1fr,6fr,1fr] p-2">
        <div class=" col-start-2 col-span-1">
            <slot />
        </div>
    </div>
</div>
