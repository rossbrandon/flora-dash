import type { FloraFlow } from '../types/flow';

export const flowData: FloraFlow = {
	tenant: {
		id: 'tenant1',
		name: 'Acme',
	},
	upstream: {
		id: 'upstreamA',
		name: 'Upstream A',
		total: 1750000,
		inError: 0,
	},
	downstreams: [
		{
			id: 'downstreamX',
			name: 'Downstream X',
			expected: 3000,
			received: 3000,
			missing: 0,
			inError: 0,
			lastReceived: {
				id: 'efaf12e7-902b-43c8-b04f-3f9207ed0fda',
				timestamp: new Date(2023, 10, 1, 20, 11, 53, 111),
			},
		},
		{
			id: 'downstreamY',
			name: 'Downstream Y',
			expected: 1750000,
			received: 751794,
			missing: 1750000 - 751794,
			inError: 0,
			lastReceived: {
				id: 'f129a60f-0f8c-4901-8b92-c41677127b5f',
				timestamp: new Date(Date.now() - 1000 * 420),
			},
		},
		{
			id: 'downstreamZ',
			name: 'Downstream Z',
			expected: 1500,
			received: 1035,
			missing: 1500 - 1035 - 350,
			inError: 350,
			lastReceived: {
				id: 'cc3567c8-2886-44b4-a40d-2ccc6b4226a0',
				timestamp: new Date(2023, 10, 1, 15, 37, 21, 342),
			},
		},
	],
};
