import { writable } from 'svelte/store';
import type { Upstream } from '$lib/types/flow';

export const currentUpstream = writable<Upstream | undefined>(undefined);
