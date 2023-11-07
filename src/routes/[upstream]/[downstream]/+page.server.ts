import { error } from '@sveltejs/kit';
import { flowData } from '../../../data/flowData';
import { errorDetail } from '../../../data/errorDetail';

export function load({ params }) {
	const flowIndex = flowData.flows.findIndex((flow) => flow.upstream.id === params.upstream);
	const upstreamData = flowData.flows[flowIndex].upstream;
	const downstreamData = flowData.flows[flowIndex].downstreams.find(
		(downstream) => downstream.id === params.downstream
	);

	if (!downstreamData) throw error(404);

	const errorData = errorDetail.find(
		(flow) => flow.upstreamId === params.upstream && flow.downstreamId === params.downstream
	);

	return {
		upstreamData,
		downstreamData,
		errorData,
	};
}
