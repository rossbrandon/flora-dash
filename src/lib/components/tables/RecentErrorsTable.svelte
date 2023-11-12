<script lang="ts">
	import { Paginator, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { PaginationSettings, TableSource } from '@skeletonlabs/skeleton';
	import { ErrorType, type FlowError } from '$lib/types/errors.js';

	export let data: FlowError[];

	const getErrorType = (type: ErrorType) => {
		switch (type) {
			case ErrorType.NETWORK_ERROR:
				return '<span class="badge variant-filled-error">Network Error</span>';
			case ErrorType.INVALID_DATA:
				return '<span class="badge variant-filled-error">Invalid Data</span>';
			case ErrorType.MISSING_DATA:
				return '<span class="badge variant-filled-error">Missing Data</span>';
			default:
				return '<span class="badge variant-filled-error">Unknown</span>';
		}
	};

	const getSourceData = () => {
		let rows: any[] = [];
		data.forEach((error, index) => {
			const row = {
				position: index + 1,
				documentId: error.documentId,
				type: getErrorType(error.type),
				logLink: `<a class="anchor" target="_blank" href='${error.logLink}'>${error.logLink}</a>`,
				message: `<span class="truncate">${error.message}</span>`,
				timestamp: new Date(error.timestamp).toLocaleString(),
			};
			rows.push(row);
		});
		// sort by timestamp desc
		rows.sort((a, b) => (b.timestamp > a.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0));
		return rows;
	};

	const sourceData = getSourceData();

	const tableData: TableSource = {
		head: ['Document ID', 'Type', 'Log Link', 'Message', 'Timestamp &#8595;'],
		body: tableMapperValues(sourceData, ['documentId', 'type', 'logLink', 'message', 'timestamp']),
		meta: tableMapperValues(sourceData, ['documentId', 'type', 'logLink', 'message', 'timestamp']),
		foot: ['Total', '', '', '', `<code class="code">${sourceData.length} Records</code>`],
	};

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: sourceData.length,
		amounts: [10, 25, 50, 100],
	} satisfies PaginationSettings;

	$: paginatedSource = tableData.body.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

{#if data.length}
	<div class="flex justify-center mb-5">
		<span class="h3">Recent Errors</span>
	</div>
	<div class="w-full space-y-4">
		<Table
			source={{ head: tableData.head, body: paginatedSource, foot: tableData.foot }}
			interactive={false}
		/>
		<Paginator
			bind:settings={paginationSettings}
			showPreviousNextButtons={true}
			showFirstLastButtons={true}
		/>
	</div>
{:else}
	<div class="flex justify-center">
		<span class="h3">No recent errors found</span>
	</div>
{/if}
