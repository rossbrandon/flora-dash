export type FloraFlow = {
	tenant: Tenant;
	upstream: Upstream;
	downstreams: Downstream[];
};
export type Tenant = {
	id: string;
	name: string;
};
export type Upstream = {
	id: string;
	name: string;
	total: number;
	inError: number;
};
export type Downstream = {
	id: string;
	name: string;
	expected: number;
	received: number;
	missing: number;
	inError: number;
	lastReceived: LastReceived;
};
export type LastReceived = {
	id: string;
	timestamp: Date;
};
export enum Status {
	FAILED = 1,
	IN_PROGRESS = 2,
	SUCCESSFUL = 3,
}
