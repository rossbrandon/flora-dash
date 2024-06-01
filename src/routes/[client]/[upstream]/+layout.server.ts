import type { FloraFlow } from '$lib/types/flow.js';
import { error } from '@sveltejs/kit';
import { FLOWS_API_URL } from '$env/static/private';

const fetchUpstreamData = async (): Promise<FloraFlow[]> => {
	const response = await fetch(FLOWS_API_URL);

	if (!response.ok) {
		throw error(response.status);
	}

	return await response.json();
};

export async function load({ params }) {
	const data: FloraFlow[] = await fetchUpstreamData();
	const upstreamData: FloraFlow | undefined = data.find((f) => {
		if (f.clientId === params.client && f.upstream.upstreamId == params.upstream) {
			return f;
		}
	});

	if (!upstreamData) throw error(404);

	// hack to force in progress status for demo flow -- this would be removed in real application
	upstreamData.downstreams.forEach((d) => {
		if (d.downstreamId === 'fileStorage') {
			d.lastReceived.timestamp = new Date(Date.now() - 7 * 60 * 1000); // 7 min ago
		}
	});

	return {
		upstreamData,
	};
}
