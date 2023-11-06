import { error } from '@sveltejs/kit';
import { flowData } from '../../data/mock';

export function load({ params }) {
	const downstreamData = flowData.downstreams.find(
		(downstream) => downstream.id === params.downstream
	);

	if (!downstreamData) throw error(404);

	return {
		downstreamData,
	};
}
