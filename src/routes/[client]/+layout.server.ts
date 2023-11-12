import { error } from '@sveltejs/kit';
import type { FloraFlow } from '$lib/types/flow.js';

const fetchDataFlows = async (): Promise<FloraFlow[]> => {
	const response = await fetch(
		'https://gist.githubusercontent.com/rossbrandon/92eecd43a1a5c1ad7aeac6ac50be5d97/raw/fe94fc4ddc8459e0e416eeb930292cc77ad4c4a2/flows.json'
	);

	if (!response.ok) {
		throw error(500);
	}

	return await response.json();
};

export async function load({ params }) {
	const flows: FloraFlow[] = await fetchDataFlows();
	const clientDataFlows = flows.filter((flow) => flow.clientId === params.client);

	if (!clientDataFlows) throw error(404);

	return { clientDataFlows };
}
