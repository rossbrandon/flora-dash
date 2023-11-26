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
	upstreamId: string;
	name: string;
	total: number;
	inError: number;
	health: Health;
};

export type Downstream = {
	downstreamId: string;
	name: string;
	expected: number;
	received: number;
	missing: number;
	inError: number;
	lastReceived: LastReceived;
	health: Health;
};

export type LastReceived = {
	documentId: string;
	timestamp: Date;
};

export enum Status {
	UNKNOWN = 'Unknown',
	FAILED = 'Failed',
	IN_PROGRESS = 'In Progress',
	SUCCESSFUL = 'Successful',
}

export enum Health {
	UNKNOWN = 'Unknown',
	UNHEALTHY = 'Unhealthy',
	INVESTIGATION_NEEDED = 'InvestigationNeeded',
	HEALTHY = 'Healthy',
}
