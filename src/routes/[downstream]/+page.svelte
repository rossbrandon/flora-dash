<script lang="ts">
	import { Paginator, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { PaginationSettings, TableSource } from '@skeletonlabs/skeleton';

	export let data;

	const sourceData = [
		{
			position: 1,
			documentId: '16771a8f-1139-41cb-b7d7-72af8ab70e83',
			description: 'Image 1',
			url: '<a href="https://example.com/image1.jpg" target="_blank">https://example.com/image1.jpg</a>',
			status: '<span class="badge variant-filled-error">missing</span>',
			message: 'Not Found',
		},
		{
			position: 2,
			documentId: '251f128a-5775-4a06-bb2c-2ef5f19e3baf',
			description: 'Image 2',
			url: '<a href="https://example.com/image2.jpg" target="_blank">https://example.com/image2.jpg</a>',
			status: '<span class="badge variant-filled-error">missing</span>',
			message: 'Not Found',
		},
		{
			position: 3,
			documentId: '1b42387f-6e69-4cd8-b3cb-3f15027639f1',
			description: 'Image 3',
			url: '<a href="https://example.com/image3.jpg" target="_blank">https://example.com/image3.jpg</a>',
			status: '<span class="badge variant-filled-primary">success</span>',
			message: 'Synced',
		},
		{
			position: 4,
			documentId: '89832ea8-1c54-456a-affd-fcb6d05a4208',
			description: 'Image 4',
			url: '<a href="https://example.com/image4.jpg" target="_blank">https://example.com/image4.jpg</a>',
			status: '<span class="badge variant-filled-primary">success</span>',
			message: 'Synced',
		},
		{
			position: 5,
			documentId: '2d445e47-20fb-4d11-a896-247a03026349',
			description: 'Image 5',
			url: '<a href="https://example.com/image5.jpg" target="_blank">https://example.com/image5.jpg</a>',
			status: '<span class="badge variant-filled-primary">success</span>',
			message: 'Synced',
		},
	];

	const tableData: TableSource = {
		head: ['Document ID', 'Description', 'URL', 'Status', 'Message'],
		body: tableMapperValues(sourceData, ['documentId', 'description', 'url', 'status', 'message']),
		meta: tableMapperValues(sourceData, [
			'position',
			'documentId',
			'description',
			'url',
			'status',
			'message',
		]),
		foot: ['Total', '', '', '', `<code class="code">${sourceData.length} Documents</code>`],
	};

	let paginationSettings = {
		page: 0,
		limit: 5,
		size: sourceData.length,
		amounts: [1, 2, 5, 10],
	} satisfies PaginationSettings;

	$: paginatedSource = tableData.body.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

<div class="container h-full mt-20 mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="flex justify-center">
			<h2 class="h2">{data.downstreamData.name} Detail</h2>
		</div>
		<div class="w-full space-y-4">
			<Table source={{ head: tableData.head, body: paginatedSource }} />
			<Paginator bind:settings={paginationSettings} showPreviousNextButtons={true} />
		</div>
	</div>
</div>
