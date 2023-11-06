import { error } from '@sveltejs/kit';
import { flowData } from '../../../data/mock';

export function load({ params }) {
	const flowIndex = flowData.flows.findIndex((flow) => flow.upstream.id === params.upstream);
	const upstreamData = flowData.flows[flowIndex].upstream;
	const downstreamData = flowData.flows[flowIndex].downstreams.find(
		(downstream) => downstream.id === params.downstream
	);

	if (!downstreamData) throw error(404);

	return {
		upstreamData,
		downstreamData,
	};
}
