<script lang="ts">
	import { currentClient } from './../clientStore';
	import UpstreamStatusCard from '$lib/components/cards/UpstreamStatusCard.svelte';

	export let data;
</script>

<!-- Breadcrumbs -->
<div class="pp-bar flex flex-col bg-surface-100-800-token pb-4 px-4">
	<div class="app-bar-row-headline">
		<ol class="breadcrumb">
			<li class="crumb">
				<a class="anchor" href="/{$currentClient?.id}">{$currentClient?.name}</a>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">Flows</li>
		</ol>
	</div>
</div>
<!-- /Breadcrumbs -->

<div class="container h-full mt-20 mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="flex justify-center space-x-5">
			{#each data.clientDataFlows as flow}
				<UpstreamStatusCard data={flow} />
			{/each}
		</div>
	</div>
</div>
