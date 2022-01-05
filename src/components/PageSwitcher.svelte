<script lang="ts">
    import Left from "@svicons/boxicons-regular/chevron-left.svelte";
    import First from "@svicons/boxicons-regular/chevrons-left.svelte";
    import Right from "@svicons/boxicons-regular/chevron-right.svelte";
    import Last from "@svicons/boxicons-regular/chevrons-right.svelte";
    import { params, url } from "@roxi/routify";

    export let page: number;
    export let max_page: number;

</script>

<div class="flex w-full text-center center justify-center gap-1">
    <a href={$url(`./`, {...$params, page: Math.max(page - 1, 1)})}>
        <Left class="w-8 align-bottom bg-true-gray-700 rounded-full"/>
    </a>
    <a href={$url(`./`, {...$params, page: 1})}>
        <First class="w-8 align-bottom bg-true-gray-700 rounded-full"/>
    </a>
    <div class="text-center">
        <span class="text-size-1.25rem align-middle"> {page} </span>
    </div>
    <a href={$url(`./`, {...$params, page: max_page})}>
        <Last class="w-8 align-bottom bg-true-gray-700 rounded-full"/>
    </a>
    <a href={$url(`./`, {...$params, page: Math.min(page + 1, max_page)})}>
        <Right class="w-8 align-bottom bg-true-gray-700 rounded-full"/>
    </a>
</div>

<style>
    button {
        @apply focus:outline-none;
    }
</style>