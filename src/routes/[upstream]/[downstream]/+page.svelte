<script lang="ts">
	import { Paginator, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { PaginationSettings, TableSource } from '@skeletonlabs/skeleton';
	import { ErrorType } from '../../../types/errors.js';

	export let data;

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
		data.errorData?.errors?.forEach((error, index) => {
			const row = {
				position: index + 1,
				documentId: error.documentId,
				type: getErrorType(error.type),
				logLink: `<a class="anchor" target="_blank" href='${error.logLink}'>${error.logLink}</a>`,
				message: `<span class="truncate">${error.message}</span>`,
				timestamp: error.timestamp.toLocaleString(),
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

<div class="pp-bar flex flex-col bg-surface-100-800-token pb-4 px-4">
	<div class="app-bar-row-headline">
		<ol class="breadcrumb">
			<li class="crumb"><a class="anchor" href="/">Flows</a></li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">
				<a class="anchor" href="/{data.upstreamData.id}">{data.upstreamData.name}</a>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">{data.downstreamData.name}</li>
		</ol>
	</div>
</div>
<div class="container h-full mt-20 mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		{#if data.errorData && data.errorData.errors && data.errorData.errors.length}
			<div class="flex justify-center">
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
	</div>
</div>
