<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
</script>

<div class="bg-true-gray-800 text-true-gray-100 min-h-screen overflow-hidden">
    <Navbar />
    <div class="grid grid-cols-[1fr,6fr,1fr]">
        <div class=" col-start-2 col-span-1">
            <slot />
        </div>
    </div>
</div>
