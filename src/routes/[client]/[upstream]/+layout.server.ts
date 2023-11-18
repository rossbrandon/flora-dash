import type { FloraFlow } from '$lib/types/flow.js';
import { error } from '@sveltejs/kit';

const fetchUpstreamData = async (clientId: string, upstreamId: string): Promise<FloraFlow> => {
	const response = await fetch(
		`http://localhost:8080/api/v1/clients/${clientId}/flows/${upstreamId}`
	);

	if (!response.ok) {
		throw error(500);
	}

	return await response.json();
};

export async function load({ params }) {
	const upstreamData = await fetchUpstreamData(params.client, params.upstream);

	if (!upstreamData) throw error(404);

	return {
		upstreamData,
	};
}
