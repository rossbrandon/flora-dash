import { ClientType } from '../types/client';

export const clients = [
	// {
	// 	id: 'contentPipeline',
	// 	name: 'User Content Pipeline',
	// 	type: ClientType.INTERNAL,
	// 	description: 'Ingestion data pipeline for user generated content and files.',
	// },
	// {
	// 	id: 'eventPipeline',
	// 	name: 'Behavioral Eventing Pipeline',
	// 	type: ClientType.INTERNAL,
	// 	description: 'Collector for behavioral eventing.',
	// },
	// {
	// 	id: 'userSettingsPipeline',
	// 	name: 'User Settings Pipeline',
	// 	type: ClientType.EXTERNAL,
	// 	description: 'Ingestion data pipeline for user profile and settings.',
	// },
	{
		id: 'internal',
		name: 'Internal Pipelines',
		type: ClientType.INTERNAL,
		description: 'Internal system-to-system data pipelines.',
	},
];
