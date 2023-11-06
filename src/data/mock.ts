import { Health, type Flora } from '../types/flow';

export const flowData: Flora = {
	flows: [
		{
			meta: {
				health: Health.INVESTIGATION_NEEDED,
				systemDiagramUrl: 'https://excalidraw.com',
				runbookUrl: 'https://example.com/runbook',
				contactSlackChannel: 'https://example.com/slack#upstreamASupport,',
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
					meta: {
						health: Health.HEALTHY,
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
					meta: {
						health: Health.HEALTHY,
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
					meta: {
						health: Health.UNHEALTHY,
					},
				},
			],
		},
		{
			meta: {
				health: Health.HEALTHY,
				contactSlackChannel: 'https://example.com/slack#upstreamBSupport,',
			},
			upstream: {
				id: 'upstreamB',
				name: 'Upstream B',
				total: 580000,
				inError: 0,
			},
			downstreams: [
				{
					id: 'downstreamQ',
					name: 'Downstream Q',
					expected: 5000,
					received: 3000,
					missing: 2000,
					inError: 0,
					lastReceived: {
						id: '7957a1fb-e1ec-4972-8881-1508c9744511',
						timestamp: new Date(Date.now() - 1000 * 420),
					},
					meta: {
						health: Health.HEALTHY,
					},
				},
				{
					id: 'downstreamR',
					name: 'Downstream R',
					expected: 573000,
					received: 573000,
					missing: 0,
					inError: 0,
					lastReceived: {
						id: '3f0958ae-c9f0-444a-bd04-5c8f9bb1b2b8',
						timestamp: new Date(2023, 10, 5, 23, 14, 52, 423),
					},
					meta: {
						health: Health.HEALTHY,
					},
				},
				{
					id: 'downstreamS',
					name: 'Downstream S',
					expected: 2000,
					received: 2000,
					missing: 0,
					inError: 0,
					lastReceived: {
						id: '4a469a2d-2145-4d57-9ca6-7f58b8bdd757',
						timestamp: new Date(2023, 9, 31, 12, 17, 27, 533),
					},
					meta: {
						health: Health.HEALTHY,
					},
				},
			],
		},
		{
			meta: {
				health: Health.UNHEALTHY,
				systemDiagramUrl: 'https://excalidraw.com',
				runbookUrl: 'https://example.com/runbook',
				contactSlackChannel: 'https://example.com/slack#upstreamCSupport,',
			},
			upstream: {
				id: 'upstreamC',
				name: 'Upstream C',
				total: 275000,
				inError: 50000,
			},
			downstreams: [
				{
					id: 'downstreamT',
					name: 'Downstream T',
					expected: 275000,
					received: 225000,
					missing: 50000,
					inError: 0,
					lastReceived: {
						id: '2d3b0226-0244-424e-8276-f8412f67c012',
						timestamp: new Date(2023, 9, 31, 17, 29, 43, 551),
					},
					meta: {
						health: Health.UNHEALTHY,
					},
				},
				{
					id: 'downstreamU',
					name: 'Downstream U',
					expected: 275000,
					received: 225000,
					missing: 50000,
					inError: 0,
					lastReceived: {
						id: 'f385924e-38fa-44c8-babc-fd1d996b5017',
						timestamp: new Date(2023, 9, 31, 23, 11, 31, 420),
					},
					meta: {
						health: Health.UNHEALTHY,
					},
				},
				{
					id: 'downstreamV',
					name: 'Downstream V',
					expected: 275000,
					received: 225000,
					missing: 50000,
					inError: 0,
					lastReceived: {
						id: '1d5c09a7-d82d-4fb0-bab1-9d7a5ebe6518',
						timestamp: new Date(2023, 9, 31, 14, 55, 32, 774),
					},
					meta: {
						health: Health.UNHEALTHY,
					},
				},
			],
		},
	],
};
