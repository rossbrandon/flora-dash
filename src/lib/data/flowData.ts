import { faker } from '@faker-js/faker';
import { Health, type Flora, type FloraFlow } from '$lib/types/flow';
import { clients } from './clients';

const determineHealth = (hasErrors: boolean, timestamp: Date): Health => {
	const THREE_HOURS = 180 * 60 * 1000;
	if (hasErrors && new Date().getTime() - timestamp.getTime() < THREE_HOURS) {
		return Health.INVESTIGATION_NEEDED;
	} else if (hasErrors) {
		return Health.UNHEALTHY;
	} else {
		return Health.HEALTHY;
	}
};

const generateDataFlows = (): FloraFlow[] => {
	const flows: FloraFlow[] = [];
	// remove the first 2 demo clients
	const generatedClients = clients.slice(2);
	for (let i = 0; i < generatedClients.length; i++) {
		const clientId = generatedClients[i].id;
		const hasErrors = Math.random() < 0.5;
		const upstreamTotalCount = Math.floor(Math.random() * 150000);
		const upstreamInError = Math.floor(Math.random() * upstreamTotalCount);
		const contentReceived = hasErrors ? Math.floor(upstreamTotalCount * 0.9) : upstreamTotalCount;
		const contentMissing = hasErrors ? Math.floor(upstreamTotalCount * 0.05) : 0;
		const contentInError = hasErrors ? Math.floor(upstreamTotalCount * 0.05) : 0;
		const eventsExpected = Math.floor(Math.random() * 300000);
		const eventsReceived = hasErrors ? Math.floor(eventsExpected * 0.9) : eventsExpected;
		const eventsMissing = hasErrors ? Math.floor(eventsExpected * 0.05) : 0;
		const eventsInError = hasErrors ? Math.floor(eventsExpected * 0.05) : 0;
		const contentTs = faker.date.recent({ days: 30 });
		const randomMs = Math.floor(Math.random() * 3 * 60 * 60 * 1000); // random ms within 3 hours ago
		const eventTs = new Date(Date.now() - randomMs);
		const contentHealth = determineHealth(hasErrors, contentTs);
		const eventHealth = determineHealth(hasErrors, eventTs);
		const overallHealth =
			contentHealth === Health.HEALTHY && eventHealth === Health.HEALTHY
				? Health.HEALTHY
				: Health.UNHEALTHY;
		const flow: FloraFlow = {
			health: overallHealth,
			meta: {
				systemDiagramUrl: 'https://excalidraw.com',
				runbookUrl: faker.internet.url() + '/runbook',
				contactSlackChannel: faker.internet.url() + '/slack#userClientSupport',
			},
			clientId: clientId,
			upstream: {
				id: clientId,
				name: 'User Client',
				total: upstreamTotalCount,
				inError: upstreamInError,
				health: upstreamInError === 0 ? Health.HEALTHY : Health.UNHEALTHY,
			},
			downstreams: [
				{
					id: 'contentIngest',
					name: 'Content Ingestion',
					expected: upstreamTotalCount,
					received: contentReceived,
					missing: contentMissing,
					inError: contentInError,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: contentTs,
					},
					health: hasErrors ? Health.UNHEALTHY : Health.HEALTHY,
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
					expected: eventsExpected,
					received: eventsReceived,
					missing: eventsMissing,
					inError: eventsInError,
					lastReceived: {
						id: faker.string.uuid(),
						timestamp: eventTs,
					},
					health: hasErrors ? Health.INVESTIGATION_NEEDED : Health.HEALTHY,
				},
			],
		};
		flows.push(flow);
	}
	return flows;
};

// include the 4 static demo flows
const flows: FloraFlow[] = [
	{
		health: Health.INVESTIGATION_NEEDED,
		meta: {
			systemDiagramUrl: 'https://excalidraw.com',
			runbookUrl: faker.internet.url() + '/runbook',
			contactSlackChannel: faker.internet.url() + '/slack#contentIngestSupport,',
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
			contactSlackChannel: faker.internet.url() + '/slack#contentIngestSupport,',
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
			contactSlackChannel: faker.internet.url() + '/slack#contentIngestSupport,',
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
];

flows.push(...generateDataFlows());

export const flowData: Flora = { flows };
