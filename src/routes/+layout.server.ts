import type { Client } from '$lib/types/client';
import { error } from '@sveltejs/kit';

const fetchClients = async (): Promise<Client[]> => {
	const response = await fetch(
		'https://gist.githubusercontent.com/rossbrandon/441a71d06920fac4776c201da18c5325/raw/95f2bfba49d672dbb25d050bdc04823b8d089a9e/clients.json'
	);

	if (!response.ok) {
		throw error(500);
	}

	return await response.json();
};

export async function load() {
	const clients: Client[] = await fetchClients();
	return { clients };
}
