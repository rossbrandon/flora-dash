import type { Client } from '$lib/types/client';
import { error } from '@sveltejs/kit';

const fetchClients = async (): Promise<Client[]> => {
	const response = await fetch('http://localhost:8080/api/v1/clients');

	if (!response.ok) {
		throw error(500);
	}

	return await response.json();
};

export async function load() {
	const clients: Client[] = await fetchClients();
	return { clients };
}
