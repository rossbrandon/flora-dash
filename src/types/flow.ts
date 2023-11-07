export type Flora = {
	flows: FloraFlow[];
};

export type FloraFlow = {
	meta: FlowMetaData;
	upstream: Upstream;
	downstreams: Downstream[];
	tenant?: Tenant;
};

export type FlowMetaData = {
	health: Health;
	systemDiagramUrl?: string;
	runbookUrl?: string;
	contactSlackChannel?: string;
};

export type Upstream = {
	id: string;
	name: string;
	total: number;
	inError: number;
	meta: FlowMetaData;
};

export type Downstream = {
	id: string;
	name: string;
	expected: number;
	received: number;
	missing: number;
	inError: number;
	lastReceived: LastReceived;
	meta: FlowMetaData;
};

export type LastReceived = {
	id: string;
	timestamp: Date;
};

export type Tenant = {
	id: string;
	name: string;
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
