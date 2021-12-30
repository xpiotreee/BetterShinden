<script lang="ts">
    import { goto, params, url } from "@roxi/routify";
    import Search from "@svicons/boxicons-regular/search.svelte";

    let search: string = $params.query;
    function handleSubmit() {
        if (search) {
            $goto($url(`/series`), { search: search });
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="min-w-max">
    <input
        bind:value={search}
        placeholder="Szukaj..."
        class="bg-true-gray-600 p-0.5 pl-1.5 rounded-sm focus:outline-none"
    />
    <button class="w-6 align-middle focus:outline-none">
        <Search class='fill-true-gray-100'/>
    </button>
</form>
