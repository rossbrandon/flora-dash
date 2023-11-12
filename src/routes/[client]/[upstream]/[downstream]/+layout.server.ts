import { error } from '@sveltejs/kit';
import { errorDetail } from '$lib/data/errorDetail';
import type { Downstream } from '$lib/types/flow.js';

export async function load({ params, parent }) {
	const { upstreamData } = await parent();
	const downstreamData = upstreamData.downstreams.find(
		(downstream: Downstream) => downstream.id === params.downstream
	);

	if (!downstreamData) throw error(404);

	const errorData = errorDetail.find(
		(flow) => flow.upstreamId === params.upstream && flow.downstreamId === params.downstream
	);

	return {
		downstreamData,
		errorData,
	};
}
