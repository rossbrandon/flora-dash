export type Flora = {
	flows: FloraFlow[];
};

export type FloraFlow = {
	clientId: string;
	upstream: Upstream;
	downstreams: Downstream[];
	health: Health;
	meta?: FlowMetaData;
};

export type FlowMetaData = {
	description?: string;
	systemDiagramUrl?: string;
	runbookUrl?: string;
	contactSlackChannel?: string;
};

export type Upstream = {
	id: string;
	name: string;
	total: number;
	inError: number;
	health: Health;
};

export type Downstream = {
	id: string;
	name: string;
	expected: number;
	received: number;
	missing: number;
	inError: number;
	lastReceived: LastReceived;
	health: Health;
};

export type LastReceived = {
	id: string;
	timestamp: Date;
};

export enum Status {
	UNKNOWN = 0,
	FAILED = 1,
	IN_PROGRESS = 2,
	SUCCESSFUL = 3,
}

export enum Health {
	UNKNOWN = 0,
	UNHEALTHY = 1,
	INVESTIGATION_NEEDED = 2,
	HEALTHY = 3,
}
