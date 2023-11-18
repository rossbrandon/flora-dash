export type Client = {
	clientId: string;
	name: string;
	clientType: ClientType;
	deviceType: DeviceType;
	description?: string;
	userAgent?: string;
};

export enum ClientType {
	UNKNOWN = 'Unknown',
	INTERNAL = 'Internal',
	EXTERNAL = 'External',
}

export enum DeviceType {
	UNKNOWN = 'Unknown',
	SYSTEM = 'System',
	WEB = 'Web',
	MOBILE = 'Mobile',
	DESKTOP = 'Desktop',
}
