export type FloraError = {
	upstreamId: string;
	downstreamId: string;
	aggregates: FlowErrorAggregate[];
	errors?: FlowError[];
};

export type FlowErrorAggregate = {
	type: ErrorType;
	count: number;
	message: string;
	logLink?: string;
};

export type FlowError = {
	upstreamId: string;
	downstreamId: string;
	documentId: string;
	type: ErrorType;
	message: string;
	timestamp: Date;
	logLink?: string;
};

export enum ErrorStatus {
	UNKNOWN = 0,
	IN_ERROR = 1,
	MISSING = 2,
	FOUND = 3,
}

export enum ErrorType {
	UNKNOWN = 0,
	NETWORK_ERROR = 1,
	INVALID_DATA = 2,
	MISSING_DATA = 3,
}
