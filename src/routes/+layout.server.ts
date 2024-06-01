import type { Client } from '$lib/types/client';
import { error } from '@sveltejs/kit';
import { CLIENTS_API_URL } from '$env/static/private';

const fetchClients = async (): Promise<Client[]> => {
	const response = await fetch(CLIENTS_API_URL);

	if (!response.ok) {
		throw error(response.status);
	}

	return await response.json();
};

export async function load() {
	const clients: Client[] = await fetchClients();

	// hack to show demo clients first -- this would be removed in real application
	const demoClientInt = clients.find((c) => c.clientId === 'internal');
	const demoClientExt = clients.find((c) => c.clientId === '3e7780b8-7b57-44d2-ab6c-163ee1e18bb3');
	if (demoClientInt && demoClientExt) {
		const demoClientIntIndex = clients.indexOf(demoClientInt);
		const demoClientExtIndex = clients.indexOf(demoClientExt);
		clients.splice(demoClientIntIndex, 1);
		clients.splice(demoClientExtIndex - 1, 1);
		clients.unshift(demoClientInt, demoClientExt);
	}

	return { clients };
}
