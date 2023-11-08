export type Client = {
	id: string;
	name: string;
	type: ClientType;
	description?: string;
};

export enum ClientType {
	UNKNOWN = 0,
	INTERNAL = 1,
	EXTERNAL = 2,
}
