<script lang="ts">
	import StatusCard from '$lib/components/cards/DownstreamStatusCard.svelte';

	export let data;
</script>

<!-- Breadcrumbs -->
<div class="pp-bar flex flex-col bg-surface-100-800-token pb-4 px-4">
	<div class="app-bar-row-headline">
		<ol class="breadcrumb">
			<li class="crumb"><a class="anchor" href="/">Flows</a></li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">{data.upstreamData.upstream.name}</li>
		</ol>
	</div>
</div>
<!-- /Breadcrumbs -->

<div class="container h-full mt-20 mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="flex justify-center space-x-5">
			{#each data.upstreamData.downstreams as downstream}
				<StatusCard upstreamId={data.upstreamData.upstream.id} downstreamData={downstream} />
			{/each}
		</div>
	</div>
</div>
