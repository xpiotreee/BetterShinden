<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import { Circle } from "svelte-loading-spinners";
    import { API_URL } from "../Constants";
    import { tagsStore } from "../stores";

    const promise = fetch(`${API_URL}/tags.json`)
        .then((res) => res.json())
        .then((res) => {
            Object.keys(res).forEach((key) => {
                res[key] = { ...res[key], id: key };
            });
            $tagsStore = res;
        });
</script>

<div class="bg-true-gray-800 text-true-gray-100 min-h-screen overflow-hidden">
    <Navbar />
    <div class="grid grid-cols-[1fr,6fr,1fr] p-2">
        <div class="col-start-2 col-span-1">
            {#await promise}
                <div
                    class="absolute top-0 left-0 w-full h-full text-center flex flex-col items-center justify-center"
                >
                    <Circle color="#f472b6" size="5" unit="rem" duration="1s" />
                    <p class="text-1.25rem p-2">Ładowanie hińskich bajek...</p>
                </div>
            {:then _}
                <slot />
            {/await}
        </div>
    </div>
</div>
