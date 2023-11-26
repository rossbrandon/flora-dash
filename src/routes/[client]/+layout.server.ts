import { error } from '@sveltejs/kit';
import type { FloraFlow } from '$lib/types/flow.js';
import { API_URL } from '$env/static/private';

const fetchClientDataFlows = async (clientId: string): Promise<FloraFlow[]> => {
	const response = await fetch(`${API_URL}/api/v1/clients/${clientId}/flows`);

	if (!response.ok) {
		throw error(500);
	}

	return await response.json();
};

export async function load({ params }) {
	const clientDataFlows: FloraFlow[] = await fetchClientDataFlows(params.client);

	// hack to force in progress status for demo flow -- this would be removed in real application
	clientDataFlows.forEach((f) => {
		if (f.clientId === 'internal' && f.upstream.upstreamId === 'contentIngest') {
			const index = f.downstreams.findIndex((d) => d.downstreamId === 'fileStorage');
			f.downstreams[index].lastReceived.timestamp = new Date(Date.now() - 7 * 60 * 1000); // 7 min ago
		}
	});

	if (!clientDataFlows) throw error(404);

	return { clientDataFlows };
}
