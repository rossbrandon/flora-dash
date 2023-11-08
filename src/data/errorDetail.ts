import { faker } from '@faker-js/faker';
import { ErrorType, type FloraError, type FlowError } from '../types/errors';

const generateErrors = (
	upstreamId: string,
	downstreamId: string,
	type: ErrorType,
	message: string,
	count: number
): FlowError[] => {
	const errors: FlowError[] = [];
	for (let i = 0; i < count; i++) {
		const error: FlowError = {
			upstreamId,
			downstreamId,
			documentId: faker.string.uuid(),
			type,
			message,
			timestamp: faker.date.recent({ days: 3 }),
			logLink: 'https://log.dataflora.io/' + faker.string.alphanumeric({ length: 6 }),
		};
		errors.push(error);
	}
	return errors;
};

export const errorDetail: FloraError[] = [
	{
		upstreamId: 'contentIngest',
		downstreamId: 'imageAnalyzer',
		aggregates: [
			{
				type: ErrorType.INVALID_DATA,
				message: 'Invalid data received',
				count: 0,
			},
			{
				type: ErrorType.MISSING_DATA,
				message: 'Missing data',
				count: 0,
			},
			{
				type: ErrorType.NETWORK_ERROR,
				message: 'Network error',
				count: 0,
			},
		],
	},
	{
		upstreamId: 'contentIngest',
		downstreamId: 'videoAnalyzer',
		aggregates: [
			{
				type: ErrorType.INVALID_DATA,
				message: 'Invalid data received',
				count: 0,
			},
			{
				type: ErrorType.MISSING_DATA,
				message: 'Missing data',
				count: 0,
			},
			{
				type: ErrorType.NETWORK_ERROR,
				message: 'Network error',
				count: 0,
			},
		],
	},
	{
		upstreamId: 'contentIngest',
		downstreamId: 'fileStorage',
		aggregates: [
			{
				type: ErrorType.INVALID_DATA,
				message: 'Invalid data received',
				count: 0,
			},
			{
				type: ErrorType.MISSING_DATA,
				message: 'Missing data',
				count: 0,
			},
			{
				type: ErrorType.NETWORK_ERROR,
				message: 'Network error',
				count: 0,
			},
		],
	},
	{
		upstreamId: 'contentIngest',
		downstreamId: 'metadataStorage',
		aggregates: [
			{
				type: ErrorType.INVALID_DATA,
				message: 'Invalid data received',
				count: 0,
			},
			{
				type: ErrorType.MISSING_DATA,
				message: 'Missing data',
				count: 0,
			},
			{
				type: ErrorType.NETWORK_ERROR,
				message: 'Network error',
				count: 350,
			},
		],
		errors: generateErrors(
			'contentIngest',
			'metadataStorage',
			ErrorType.NETWORK_ERROR,
			'Could not connect to metadataStorage service: http timeout (10s) reached',
			350
		),
	},
];
