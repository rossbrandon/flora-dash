import { writable } from 'svelte/store';
import type { Client } from '$lib/types/client';

export const currentClient = writable<Client | undefined>(undefined);
