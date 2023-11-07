import { faker } from '@faker-js/faker';
import { Health, type Flora } from '../types/flow';

export const flowData: Flora = {
	flows: [
		{
			meta: {
				health: Health.INVESTIGATION_NEEDED,
				systemDiagramUrl: 'https://excalidraw.com',
				runbookUrl: faker.internet.url() + '/runbook',
				contactSlackChannel: faker.internet.url() + '/slack#upstreamASupport,',
			},
			upstream: {
				id: 'contentIngest',
				name: 'Content Ingestion',
				total: 1750000,
				inError: 0,
				meta: {
					health: Health.HEALTHY,
				},
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
					meta: {
						health: Health.HEALTHY,
					},
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
					meta: {
						health: Health.HEALTHY,
					},
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
					meta: {
						health: Health.HEALTHY,
					},
				},
				{
					id: 'metadataAnalyzer',
					name: 'Metadata Analyzer',
					expected: 1500,
					received: 1035,
					missing: 1500 - 1035 - 350,
					inError: 350,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: faker.date.recent({ days: 2 }),
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
				runbookUrl: faker.internet.url() + '/runbook',
				contactSlackChannel: faker.internet.url() + '/slack#upstreamASupport,',
			},
			upstream: {
				id: 'eventCollector',
				name: 'Event Collector',
				total: 580000,
				inError: 0,
				meta: {
					health: Health.HEALTHY,
				},
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
					meta: {
						health: Health.HEALTHY,
					},
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
					meta: {
						health: Health.HEALTHY,
					},
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
				runbookUrl: faker.internet.url() + '/runbook',
				contactSlackChannel: faker.internet.url() + '/slack#upstreamASupport,',
			},
			upstream: {
				id: 'userManager',
				name: 'User Manager',
				total: 275000,
				inError: 50000,
				meta: {
					health: Health.UNHEALTHY,
				},
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
					meta: {
						health: Health.UNHEALTHY,
					},
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
					meta: {
						health: Health.UNHEALTHY,
					},
				},
			],
		},
	],
};
