<script lang="ts">
    import Checkbox from "@svicons/boxicons-regular/checkbox.svelte";
    import CheckboxChecked from "@svicons/boxicons-regular/checkbox-checked.svelte";
    import CheckboxMinus from "@svicons/boxicons-regular/checkbox-minus.svelte";
    import { tagsSettingsStore } from '../stores';
    import type * as Api from "../Interfaces";
    import tippy from "sveltejs-tippy";

    export let tag: Api.Tag;

    $: value = $tagsSettingsStore[tag.id] == undefined ? 0 : $tagsSettingsStore[tag.id];
    const checkboxes = [Checkbox, CheckboxChecked, CheckboxMinus];

    function handleClick() {
        value++;
        if (value >= checkboxes.length) {
            value = 0;
        }
        
        $tagsSettingsStore = {...$tagsSettingsStore, [tag.id]: value};
    }

    const props = {
        content: tag.description
    }
</script>

<button on:click={handleClick} class="text-left whitespace-nowrap" use:tippy={props}>
    <svelte:component this={checkboxes[value]} class="w-6 align-bottom" />
    <span class="text-0.8rem"> {tag.name} </span>
</button>

<style>
    button {
        @apply focus:outline-none;
    }
</style>
