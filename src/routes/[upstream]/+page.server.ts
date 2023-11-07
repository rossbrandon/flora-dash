import { error } from '@sveltejs/kit';
import { flowData } from '../../data/flowData';

export function load({ params }) {
	const upstreamData = flowData.flows.find((flow) => flow.upstream.id === params.upstream);

	if (!upstreamData) throw error(404);

	return {
		upstreamData,
	};
}
