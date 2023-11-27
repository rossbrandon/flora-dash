import type { FloraFlow } from '$lib/types/flow.js';
import { error } from '@sveltejs/kit';
import { API_URL, API_TOKEN } from '$env/static/private';

const fetchUpstreamData = async (clientId: string, upstreamId: string): Promise<FloraFlow> => {
	const response = await fetch(`${API_URL}/api/v1/clients/${clientId}/flows/${upstreamId}`, {
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
		},
	});

	if (!response.ok) {
		throw error(response.status);
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
