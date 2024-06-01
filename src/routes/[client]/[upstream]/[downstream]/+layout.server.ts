import { error } from '@sveltejs/kit';
import type { FloraFlow, Downstream } from '$lib/types/flow.js';
import type { FloraError } from '$lib/types/errors.js';
import { FLOWS_API_URL, ERRORS_API_URL } from '$env/static/private';

const fetchUpstreamData = async (): Promise<FloraFlow[]> => {
	const response = await fetch(FLOWS_API_URL);

	if (!response.ok) {
		throw error(response.status);
	}

	return await response.json();
};

const fetchErrorDetails = async (): Promise<FloraError[]> => {
	const response = await fetch(ERRORS_API_URL);

	if (!response.ok) {
		throw error(response.status);
	}

	return await response.json();
};

export async function load({ params }) {
	const upstreams: FloraFlow[] = await fetchUpstreamData();
	const upstreamData: FloraFlow | undefined = upstreams.find((f) => {
		if (f.clientId === params.client && f.upstream.upstreamId == params.upstream) {
			return f;
		}
	});

	if (!upstreamData) throw error(404);

	const downstreamData = upstreamData.downstreams.find(
		(downstream: Downstream) => downstream.downstreamId === params.downstream
	);

	if (!downstreamData) throw error(404);

	const errors: FloraError[] = await fetchErrorDetails();
	const errorData: FloraError | undefined = errors.find(
		(e) => e.upstreamId === params.upstream && e.downstreamId === params.downstream
	);

	return {
		downstreamData,
		errorData,
	};
}
