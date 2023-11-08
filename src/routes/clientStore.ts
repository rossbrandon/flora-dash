import { writable } from 'svelte/store';
import { ClientType, type Client } from '../types/client';

export const defaultClient: Client = {
	id: 'default',
	name: 'Default Client',
	type: ClientType.INTERNAL,
};

export const currentClient = writable<Client>(defaultClient);
