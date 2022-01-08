<script lang="ts">
    import type * as Api from "../Interfaces";
    import tippy from "sveltejs-tippy";
    import { params, url } from "@roxi/routify";
    export let tag: Api.Tag;

    const props = {
        content: tag.description,
    };
</script>

<a
    use:tippy={props}
    class="p-1 m-0.75 rounded-md border-pink-400 border-1"
    href={$url("/series", { ...$params, genres: `i${tag.id}` })}
>
    {tag.name}
</a>
