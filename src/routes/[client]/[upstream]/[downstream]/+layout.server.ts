import { error } from '@sveltejs/kit';
import type { Downstream } from '$lib/types/flow.js';
import type { FloraError } from '$lib/types/errors.js';

const fetchErrorDetails = async (): Promise<FloraError[]> => {
	const response = await fetch(
		'https://gist.githubusercontent.com/rossbrandon/62307d20027d43a4c20e9c6ad77a4dbe/raw/ffdce5c237405a8328b3abc677d159c0701350dc/errors.json'
	);
	if (!response.ok) {
		throw error(500);
	}
	return await response.json();
};

export async function load({ params, parent }) {
	const { upstreamData } = await parent();
	const downstreamData = upstreamData.downstreams.find(
		(downstream: Downstream) => downstream.id === params.downstream
	);

	if (!downstreamData) throw error(404);

	const errorDetail: FloraError[] = await fetchErrorDetails();
	const errorData = errorDetail.find(
		(flow) => flow.upstreamId === params.upstream && flow.downstreamId === params.downstream
	);
	return {
		downstreamData,
		errorData,
	};
}
