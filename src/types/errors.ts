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
	UNKNOWN = 'Unknown',
	IN_ERROR = 'In Error',
	MISSING = 'Missing',
	FOUND = 'Found',
}

export enum ErrorType {
	UNKNOWN = 'Unknown',
	NETWORK_ERROR = 'Network Error',
	INVALID_DATA = 'Invalid Data',
	MISSING_DATA = 'Missing Data',
}
