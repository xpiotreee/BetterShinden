<script lang="ts">
    import Left from "@svicons/boxicons-regular/chevron-left.svelte";
    import First from "@svicons/boxicons-regular/chevrons-left.svelte";
    import Right from "@svicons/boxicons-regular/chevron-right.svelte";
    import Last from "@svicons/boxicons-regular/chevrons-right.svelte";
    import { goto, params, url } from "@roxi/routify";

    export let page: number;
    export let max_page: number;

    function switchPage(page: number) {
        if (page > max_page || page < 1) {
            return;
        }

        const parameters = { ...$params };
        parameters.page = page;
        $goto($url("./"), parameters);
    }
</script>

<div class="flex w-full text-center center justify-center gap-1">
    <button on:click={() => switchPage(page - 1)}>
        <Left class="w-8 align-bottom bg-true-gray-700 rounded-full"/>
    </button>
    <button on:click={() => switchPage(1)}>
        <First class="w-8 align-bottom bg-true-gray-700 rounded-full"/>
    </button>
    <div class="text-center">
        <span class="text-size-1.25rem align-middle"> {page} </span>
    </div>
    <button on:click={() => switchPage(max_page)}>
        <Last class="w-8 align-bottom bg-true-gray-700 rounded-full"/>
    </button>
    <button on:click={() => switchPage(page + 1)}>
        <Right class="w-8 align-bottom bg-true-gray-700 rounded-full"/>
    </button>
</div>

<style>
    button {
        @apply focus:outline-none;
    }
</style>