import { error } from '@sveltejs/kit';
import { errorDetail } from '../../../../data/errorDetail';

export async function load({ params, parent }) {
	const { upstreamData } = await parent();
	const downstreamData = upstreamData.downstreams.find(
		(downstream) => downstream.id === params.downstream
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
