<script lang="ts">
	import UpstreamStatusCard from '$lib/components/cards/UpstreamStatusCard.svelte';
	import { currentClient } from '$lib/stores/client.js';

	export let data;
</script>

<div class="grid grid-cols-4 m-5 gap-5">
	<div class="col-span-4 text-center">
		<div class="text-left">
			<h3 class="h3 text-center m-5">Client Info</h3>
			<div><strong>Name: </strong>{$currentClient?.name}</div>
			<div><strong>ID: </strong>{$currentClient?.clientId}</div>
			<div><strong>Device Type: </strong>{$currentClient?.deviceType}</div>
			{#if $currentClient?.userAgent}
				<div><strong>User Agent: </strong>{$currentClient?.userAgent}</div>
			{/if}
			<div><strong>Description: </strong>{$currentClient?.description}</div>
		</div>
	</div>
	<div class="col-span-4">
		<hr />
		<h3 class="h3 text-center m-5">Data Flows</h3>
	</div>
	{#each data.clientDataFlows as flow}
		<div class="col-span-4 md:col-span-2 lg:col-span-1">
			<UpstreamStatusCard data={flow} />
		</div>
	{/each}
</div>
