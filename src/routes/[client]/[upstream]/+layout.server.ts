import { error } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const { clientDataFlows } = await parent();
	const upstreamData = clientDataFlows.find((flow) => flow.upstream.id === params.upstream);

	if (!upstreamData) throw error(404);

	return {
		upstreamData,
	};
}
