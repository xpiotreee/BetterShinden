<script lang="ts">
    import type * as Api from "../Interfaces";
    import tippy from "sveltejs-tippy";
    export let tag: Api.Tag;

    const props = {
        content: tag.description
    }
</script>

<a use:tippy={props} class="p-1 m-0.75 rounded-md border-pink-400 border-1" href=" ">
    {tag.name}
</a>
