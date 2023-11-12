<script lang="ts">
	import DownstreamStatusCard from '$lib/components/cards/DownstreamStatusCard.svelte';
	import { currentUpstream } from '$lib/stores/upstream.js';

	export let data;

	currentUpstream.set(data.upstreamData.upstream);
</script>

<div class="grid grid-cols-4 m-5 gap-5">
	<div class="col-span-4 text-center">
		<h3 class="h3 text-center m-5">Upstream Info</h3>
	</div>
	<div class="col-span-2 text-left">
		<div><strong>Name: </strong>{data.upstreamData.upstream.name}</div>
		<div><strong>ID: </strong>{data.upstreamData.upstream.id}</div>
		<div><strong>Total Documents: </strong>{data.upstreamData.upstream.total}</div>
		<div><strong>Documents in Error: </strong>{data.upstreamData.upstream.inError}</div>
	</div>
	<div class="col-span-2 text-right">
		{#if data.upstreamData.meta && data.upstreamData.meta?.systemDiagramUrl}
			<div>
				<a class="anchor" href={data.upstreamData.meta.systemDiagramUrl} target="_blank"
					>System Diagram</a
				>
			</div>
		{:else}
			<div>
				<span>System diagram not found... </span><a
					class="anchor"
					href="https://excalidraw.com"
					target="_blank">Add one!</a
				>
			</div>
		{/if}
		{#if data.upstreamData.meta && data.upstreamData.meta?.runbookUrl}
			<div>
				<a class="anchor" href={data.upstreamData.meta.runbookUrl} target="_blank">Runbook</a>
			</div>
		{:else}
			<div>
				<span>Runbook not found... </span><a
					class="anchor"
					href="https://example.com/runbook"
					target="_blank">Add one!</a
				>
			</div>
		{/if}
		{#if data.upstreamData.meta && data.upstreamData.meta?.contactSlackChannel}
			<div>
				<a class="anchor" href={data.upstreamData.meta.contactSlackChannel} target="_blank"
					>Slack Channel</a
				>
			</div>
		{:else}
			<div>
				<span>Slack channel not found... </span><a
					class="anchor"
					href="https://example.com/slack"
					target="_blank">Add one!</a
				>
			</div>
		{/if}
	</div>
	<div class="col-span-4">
		<hr />
		<h3 class="h3 text-center m-5">Downstreams</h3>
	</div>
	{#each data.upstreamData.downstreams as downstream}
		<div class="col-span-1">
			<DownstreamStatusCard
				upstreamId={data.upstreamData.upstream.id}
				downstreamData={downstream}
			/>
		</div>
	{/each}
</div>
