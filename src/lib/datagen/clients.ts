import { faker } from '@faker-js/faker';
import { ClientType, DeviceType, type Client } from '$lib/types/client';
import { getRandomEnum } from './utils';

const generateClients = (count: number): Client[] => {
	const clients: Client[] = [];
	// include the 2 static demo clients
	const internalClient = {
		id: 'internal',
		name: 'Internal Pipelines',
		type: ClientType.INTERNAL,
		description: 'Internal system-to-system data pipelines.',
		deviceType: DeviceType.SYSTEM,
		userAgent: 'grpc-rust/' + faker.system.semver(),
	};
	const externalClient = {
		id: '3e7780b8-7b57-44d2-ab6c-163ee1e18bb3',
		name: 'User iOS Device',
		type: ClientType.EXTERNAL,
		description: 'End user device',
		deviceType: DeviceType.MOBILE,
		userAgent: faker.internet.userAgent(),
	};
	clients.push(internalClient, externalClient);
	for (let i = 0; i < count; i++) {
		const client: Client = {
			id: faker.string.uuid(),
			name: faker.internet.domainWord(),
			type: ClientType.EXTERNAL,
			description: faker.company.catchPhrase(),
			deviceType: getRandomEnum(DeviceType),
			userAgent: faker.internet.userAgent(),
		};
		clients.push(client);
	}
	return clients;
};

export const clients: Client[] = generateClients(10);
