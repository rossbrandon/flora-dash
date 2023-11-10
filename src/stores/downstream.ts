import { writable } from 'svelte/store';
import type { Downstream } from '../types/flow';

export const currentDownstream = writable<Downstream | undefined>(undefined);
