import { faker } from '@faker-js/faker';
import { Health, type Flora } from '../types/flow';

export const flowData: Flora = {
	flows: [
		{
			health: Health.INVESTIGATION_NEEDED,
			meta: {
				systemDiagramUrl: 'https://excalidraw.com',
				runbookUrl: faker.internet.url() + '/runbook',
				contactSlackChannel: faker.internet.url() + '/slack#upstreamASupport,',
			},
			clientId: 'internal',
			upstream: {
				id: 'contentIngest',
				name: 'Content Ingestion',
				total: 1750000,
				inError: 0,
				health: Health.HEALTHY,
			},
			downstreams: [
				{
					id: 'imageAnalyzer',
					name: 'Image Analyzer',
					expected: 3000,
					received: 3000,
					missing: 0,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: faker.date.recent({ days: 3 }),
					},
					health: Health.HEALTHY,
				},
				{
					id: 'videoAnalyzer',
					name: 'Video Analyzer',
					expected: 17000,
					received: 17000,
					missing: 0,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: faker.date.recent({ days: 5 }),
					},
					health: Health.HEALTHY,
				},
				{
					id: 'fileStorage',
					name: 'File Storage',
					expected: 1750000,
					received: 751794,
					missing: 1750000 - 751794,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: new Date(Date.now() - 7 * 60 * 1000), // 7 min ago
					},
					health: Health.HEALTHY,
				},
				{
					id: 'metadataStorage',
					name: 'Metadata Storage',
					expected: 1500,
					received: 1035,
					missing: 1500 - 1035 - 350,
					inError: 350,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: faker.date.recent({ days: 2 }),
					},
					health: Health.INVESTIGATION_NEEDED,
				},
			],
		},
		{
			health: Health.HEALTHY,
			meta: {
				runbookUrl: faker.internet.url() + '/runbook',
				contactSlackChannel: faker.internet.url() + '/slack#upstreamASupport,',
			},
			clientId: 'internal',
			upstream: {
				id: 'eventCollector',
				name: 'Event Collector',
				total: 580000,
				inError: 0,
				health: Health.HEALTHY,
			},
			downstreams: [
				{
					id: 'clickAnalyzer',
					name: 'Click Analyzer',
					expected: 5000,
					received: 3000,
					missing: 2000,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
					},
					health: Health.HEALTHY,
				},
				{
					id: 'recommender',
					name: 'Recommender Engine',
					expected: 573000,
					received: 573000,
					missing: 0,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: faker.date.recent({ days: 1 }),
					},
					health: Health.HEALTHY,
				},
				{
					id: 'adCreator',
					name: 'Ad Creator',
					expected: 2000,
					received: 2000,
					missing: 0,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: faker.date.recent({ days: 1 }),
					},
					health: Health.HEALTHY,
				},
			],
		},
		{
			health: Health.UNHEALTHY,
			meta: {
				systemDiagramUrl: 'https://excalidraw.com',
				runbookUrl: faker.internet.url() + '/runbook',
				contactSlackChannel: faker.internet.url() + '/slack#upstreamASupport,',
			},
			clientId: 'internal',
			upstream: {
				id: 'userManager',
				name: 'User Manager',
				total: 275000,
				inError: 50000,
				health: Health.UNHEALTHY,
			},
			downstreams: [
				{
					id: 'settingsService',
					name: 'Settings Service',
					expected: 275000,
					received: 225000,
					missing: 50000,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: faker.date.recent({ days: 10 }),
					},
					health: Health.UNHEALTHY,
				},
				{
					id: 'profileService',
					name: 'Profile Service',
					expected: 275000,
					received: 225000,
					missing: 50000,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: faker.date.recent({ days: 10 }),
					},
					health: Health.UNHEALTHY,
				},
			],
		},
		{
			health: Health.HEALTHY,
			clientId: '3e7780b8-7b57-44d2-ab6c-163ee1e18bb3',
			upstream: {
				id: '3e7780b8-7b57-44d2-ab6c-163ee1e18bb3',
				name: 'User Client',
				total: 11337,
				inError: 0,
				health: Health.HEALTHY,
			},
			downstreams: [
				{
					id: 'contentIngest',
					name: 'Content Ingestion',
					expected: 11337,
					received: 9857,
					missing: 11337 - 9857,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: new Date(Date.now() - 47 * 1000), // 47 sec ago
					},
					health: Health.HEALTHY,
				},
				{
					id: 'userManager',
					name: 'User Manager',
					expected: 15,
					received: 15,
					missing: 0,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: faker.date.recent({ days: 30 }),
					},
					health: Health.HEALTHY,
				},
				{
					id: 'eventCollector',
					name: 'Event Collector',
					expected: 78549,
					received: 78549,
					missing: 0,
					inError: 0,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: faker.date.recent({ days: 30 }),
					},
					health: Health.HEALTHY,
				},
			],
		},
	],
};
