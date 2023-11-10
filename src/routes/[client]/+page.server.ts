import { error } from '@sveltejs/kit';
import { flowData } from '../../data/flowData';

export function load({ params }) {
	const clientDataFlows = flowData.flows.filter((flow) => flow.clientId === params.client);

	if (!clientDataFlows) throw error(404);

	return { clientDataFlows };
}
