<script lang="ts">
    import { afterPageLoad, goto, isActive, params, redirect, url } from "@roxi/routify";

    let search: string = $params.query;
    function handleSubmit() {
        $goto($url(`/series`), { query: search });
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="min-w-max">
    <input
        bind:value={search}
        placeholder="Szukaj..."
        class="bg-true-gray-600 p-0.5 pl-1.5 rounded-sm focus:outline-none"
    />
</form>
