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

	// temp hack to force in progress status for demo flow
	clientDataFlows.forEach((f) => {
		if (f.clientId === 'internal' && f.upstream.id === 'contentIngest') {
			const index = f.downstreams.findIndex((d) => d.id === 'fileStorage');
			f.downstreams[index].lastReceived.timestamp = new Date(Date.now() - 7 * 60 * 1000); // 7 min ago
		}
	});

	if (!clientDataFlows) throw error(404);

	return { clientDataFlows };
}
