export type FloraError = {
	upstreamId: string;
	downstreamId: string;
	aggregates: FlowErrorAggregate[];
	errors?: FlowError[];
};

export type FlowErrorAggregate = {
	errorType: ErrorType;
	count: number;
	message: string;
	logLink?: string;
};

export type FlowError = {
	upstreamId: string;
	downstreamId: string;
	documentId: string;
	errorType: ErrorType;
	message: string;
	timestamp: Date;
	logLink?: string;
};

export enum ErrorStatus {
	UNKNOWN = 'Unknown',
	IN_ERROR = 'InError',
	MISSING = 'Missing',
	FOUND = 'Found',
}

export enum ErrorType {
	UNKNOWN = 'Unknown',
	NETWORK_ERROR = 'NetworkError',
	INVALID_DATA = 'InvalidData',
	MISSING_DATA = 'MissingData',
}
