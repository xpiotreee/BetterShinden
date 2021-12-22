<script lang="ts">
    import type * as Api from "../../Interfaces";

    export let anime: Api.AnimeInfo;

    const {
        type,
        status,
        start_airing,
        end_airing,
        episode_count,
        studios,
        episode_length,
        mpaa,
    } = anime.info;
    const info = [
        ["Typ", type],
        ["Status", status],
        ["Liczba odcinków", episode_count],
        ["Studio", studios.join(", ")],
        ["Długość odcinka", episode_length],
        ["MPAA", mpaa],
    ];
    if (start_airing) {
        info.splice(2, 0, [
            "Data emisji",
            new Date(start_airing).toLocaleDateString("pl-PL"),
        ]);
    }
    if (end_airing) {
        info.splice(2, 0, [
            "Koniec emisji",
            new Date(end_airing).toLocaleDateString("pl-PL"),
        ]);
    }
</script>

<div class="text-center">
    <span> Informacje </span>
</div>
{#each info as [label, value]}
    <span class="font-400"> {label}: </span>
    <span>{value}</span><br />
{/each}
