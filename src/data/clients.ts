import { faker } from '@faker-js/faker';
import { ClientType, DeviceType } from '../types/client';

export const clients = [
	// {
	// 	id: 'contentPipeline',
	// 	name: 'User Content Pipeline',
	// 	type: ClientType.INTERNAL,
	// 	description: 'Ingestion data pipeline for user generated content and files.',
	// 	deviceType: DeviceType.SYSTEM,
	// },
	// {
	// 	id: 'eventPipeline',
	// 	name: 'Behavioral Eventing Pipeline',
	// 	type: ClientType.INTERNAL,
	// 	description: 'Collector for behavioral eventing.',
	// 	deviceType: DeviceType.SYSTEM,
	// },
	// {
	// 	id: 'userSettingsPipeline',
	// 	name: 'User Settings Pipeline',
	// 	type: ClientType.EXTERNAL,
	// 	description: 'Ingestion data pipeline for user profile and settings.',
	// 	deviceType: DeviceType.SYSTEM,
	// },
	{
		id: 'internal',
		name: 'Internal Pipelines',
		type: ClientType.INTERNAL,
		description: 'Internal system-to-system data pipelines.',
		deviceType: DeviceType.SYSTEM,
		userAgent: 'grpc-rust/' + faker.system.semver(),
	},
	{
		id: '3e7780b8-7b57-44d2-ab6c-163ee1e18bb3',
		name: 'User iOS Device',
		type: ClientType.EXTERNAL,
		description: 'End user device',
		deviceType: DeviceType.MOBILE,
		userAgent: faker.internet.userAgent(),
	},
];
