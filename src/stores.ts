import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type * as Api from './Interfaces';

export const episodesStore = writable([]) as Writable<Api.Episode[]>;
export const animeStore = writable() as Writable<Api.AnimeInfo>;
export const tagsStore = writable() as Writable<{ [key: string]: Api.Tag }>;
