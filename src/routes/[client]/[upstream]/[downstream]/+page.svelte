<script lang="ts">
	import RecentErrorsTable from '$lib/components/tables/RecentErrorsTable.svelte';
	import { currentClient } from '../../../clientStore.js';

	export let data;
</script>

<!-- Breadcrumbs -->
<div class="pp-bar flex flex-col bg-surface-100-800-token pb-4 px-4">
	<div class="app-bar-row-headline">
		<ol class="breadcrumb">
			<li class="crumb">
				<a class="anchor" href="/{$currentClient.id}">{$currentClient.name}</a>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb"><a class="anchor" href="/{$currentClient.id}">Flows</a></li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">
				<a class="anchor" href="/{$currentClient.id}/{data.upstreamData.id}"
					>{data.upstreamData.name}</a
				>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">{data.downstreamData.name}</li>
		</ol>
	</div>
</div>
<!-- /Breadcrumbs -->

<div class="container h-full mt-20 mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<RecentErrorsTable data={data.errorData?.errors ?? []} />
	</div>
</div>
