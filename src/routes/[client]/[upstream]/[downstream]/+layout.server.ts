import { error } from '@sveltejs/kit';
import type { FloraFlow, Downstream } from '$lib/types/flow.js';
import type { FloraError } from '$lib/types/errors.js';
import { API_URL } from '$env/static/private';

const fetchUpstreamData = async (clientId: string, upstreamId: string): Promise<FloraFlow> => {
	const response = await fetch(`${API_URL}/api/v1/clients/${clientId}/flows/${upstreamId}`);

	if (!response.ok) {
		throw error(500);
	}

	return await response.json();
};

const fetchErrorDetails = async (upstreamId: string, downstreamId: string): Promise<FloraError> => {
	const response = await fetch(
		`${API_URL}/api/v1/errors/upstreams/${upstreamId}/downstreams/${downstreamId}`
	);

	if (!response.ok) {
		throw error(500);
	}

	return await response.json();
};

export async function load({ params }) {
	const upstreamData = await fetchUpstreamData(params.client, params.upstream);
	const downstreamData = upstreamData.downstreams.find(
		(downstream: Downstream) => downstream.downstreamId === params.downstream
	);

	if (!downstreamData) throw error(404);

	const errorData: FloraError = await fetchErrorDetails(params.upstream, params.downstream);
	return {
		downstreamData,
		errorData,
	};
}
