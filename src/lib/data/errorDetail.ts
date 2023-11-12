import { faker } from '@faker-js/faker';
import { ErrorType, type FloraError, type FlowError } from '$lib/types/errors';
import { getRandomEnum } from './utils';
import { clients } from './clients';
import { flowData } from './flowData';
import type { Downstream } from '$lib/types/flow';

const generateSpecificErrors = (
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

const generatedClients = clients.slice(2);

const generateError = (clientId: string, downstreamData: Downstream): FloraError => {
	const errorCount =
		downstreamData?.inError && downstreamData?.inError > 0 ? downstreamData?.inError : 0;
	const floraError: FloraError = {
		upstreamId: clientId,
		downstreamId: downstreamData.id,
		aggregates: [
			{
				type: ErrorType.INVALID_DATA,
				message: 'Invalid data received',
				count: Math.floor(errorCount * 0.25),
			},
			{
				type: ErrorType.MISSING_DATA,
				message: 'Missing data',
				count: Math.floor(errorCount * 0.65),
			},
			{
				type: ErrorType.NETWORK_ERROR,
				message: 'Network error',
				count: Math.floor(errorCount * 0.1),
			},
		],
		errors: [],
	};
	for (let i = 0; i < errorCount; i++) {
		const error: FlowError = {
			upstreamId: floraError.upstreamId,
			downstreamId: floraError.downstreamId,
			documentId: faker.string.uuid(),
			type: getRandomEnum(ErrorType),
			message: faker.hacker.phrase(),
			timestamp: faker.date.recent({ days: 3 }),
			logLink: 'https://log.dataflora.io/' + faker.string.alphanumeric({ length: 6 }),
		};
		floraError.errors?.push(error);
	}
	return floraError;
};

const generateErrors = (): FloraError[] => {
	const errors: FloraError[] = [];
	for (let i = 0; i < generatedClients.length; i++) {
		const clientId = generatedClients[i].id;
		const flow = flowData.flows.find((f) => f.clientId === clientId);
		flow?.downstreams.forEach((d) => {
			errors.push(generateError(clientId, d));
		});
	}
	return errors;
};

const errors: FloraError[] = [
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
		errors: generateSpecificErrors(
			'contentIngest',
			'metadataStorage',
			ErrorType.NETWORK_ERROR,
			'Could not connect to metadataStorage service: http timeout (10s) reached',
			350
		),
	},
];

errors.push(...generateErrors());

export const errorDetail: FloraError[] = errors;
