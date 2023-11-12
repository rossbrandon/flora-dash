<script lang="ts">
	import RecentErrorsTable from '$lib/components/tables/RecentErrorsTable.svelte';
	import { currentDownstream } from '$lib/stores/downstream.js';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { ErrorType } from '$lib/types/errors.js';

	export let data;

	currentDownstream.set(data.downstreamData);

	const modalStore = getModalStore();
	const resyncModal: ModalSettings = {
		type: 'confirm',
		title: 'Re-sync Data Flow?',
		body:
			'<span class="text-warning-500 font-bold">Warning!</span> Re-syncing ' +
			'data flows may cause an increase in system utilization and costs.' +
			'<br /><br />Do you wish to proceed?',
		response: (r: boolean) => console.log('response:', r),
	};
	const deleteModal: ModalSettings = {
		type: 'confirm',
		title: 'Delete Data?',
		body:
			'<span class="text-error-500 font-bold">Stop!</span> Deleting data ' +
			'may cause service degredation and customer impacts.<br /><br />' +
			'Are you sure you know what you are doing?',
		response: (r: boolean) => console.log('response:', r),
	};

	const invalidData = data.errorData?.aggregates.find((e) => e.type === ErrorType.INVALID_DATA);
	const missingData = data.errorData?.aggregates.find((e) => e.type === ErrorType.MISSING_DATA);
	const networkErrors = data.errorData?.aggregates.find((e) => e.type === ErrorType.NETWORK_ERROR);
</script>

<div class="grid grid-cols-4 m-5 gap-5">
	<div class="col-span-4 text-center">
		<h3 class="h3 text-center m-5">Downstream Info</h3>
	</div>
	<div class="col-span-2 text-left">
		<div><strong>Name: </strong>{data.downstreamData.name}</div>
		<div><strong>ID: </strong>{data.downstreamData.id}</div>
		<div><strong>Last Document Received: </strong></div>
		<div class="ml-5">
			<strong>ID: </strong>
			{data.downstreamData.lastReceived.id}
		</div>
		<div class="ml-5">
			<strong>Timestamp: </strong>
			{data.downstreamData.lastReceived.timestamp.toLocaleString()}
		</div>
		<div><strong>Expected: </strong>{data.downstreamData.expected}</div>
		<div><strong>Received: </strong>{data.downstreamData.received}</div>
		<div><strong>In Error: </strong>{data.downstreamData.inError}</div>
	</div>
	<div class="col-span-2 text-right">
		<button
			type="button"
			class="btn variant-filled-warning rounded"
			on:click={() => modalStore.trigger(resyncModal)}
		>
			<span>
				<!-- circle arrow heroicon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
					/>
				</svg>
			</span>
			<span>Re-Sync Data</span>
		</button>
		<button
			type="button"
			class="btn variant-filled-error rounded"
			on:click={() => modalStore.trigger(deleteModal)}
		>
			<span>
				<!-- trash can heroicon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</span>
			<span>Delete Data</span>
		</button>
	</div>
	<div class="col-span-4">
		<hr />
		<h3 class="h3 text-center m-5">Error Details</h3>
		<div class="mb-10">
			<div><strong>Invalid Data Errors: </strong>{invalidData?.count}</div>
			<div><strong>Missing Data Errors: </strong>{missingData?.count}</div>
			<div><strong>Network Errors: </strong>{networkErrors?.count}</div>
		</div>
		<RecentErrorsTable data={data.errorData?.errors ?? []} />
	</div>
</div>
