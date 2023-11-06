<script lang="ts">
	import { Health, type FloraFlow } from '../types/flow';

	export let data: FloraFlow;

	const getStatusText = (health: Health) => {
		switch (health) {
			case Health.HEALTHY:
				return 'Healthy';
			case Health.INVESTIGATION_NEEDED:
				return 'Investigation Needed';
			case Health.UNHEALTHY:
				return 'Unhealthy';
			default:
				return 'Unhealthy';
		}
	};

	const getStatusSubText = (health: Health) => {
		switch (health) {
			case Health.HEALTHY:
				return 'All data flows are within acceptable limits';
			case Health.INVESTIGATION_NEEDED:
				return 'At least one data flow falls below acceptable thresholds';
			case Health.UNHEALTHY:
				return 'One or more data flows are unhealthy';
			default:
				return 'One or more data flows are unhealthy';
		}
	};

	const getStatusColor = (health: Health) => {
		switch (health) {
			case Health.HEALTHY:
				return 'primary';
			case Health.INVESTIGATION_NEEDED:
				return 'warning';
			case Health.UNHEALTHY:
				return 'red';
			default:
				return 'red';
		}
	};

	const health = data.meta.health;
	const statusText = getStatusText(health);
	const statusSubText = getStatusSubText(health);
	const statusColor = getStatusColor(health);
</script>

<div class="card w-3/5">
	<header class="card-header">{data.upstream.name}</header>
	<section class="p-4 text-left h-48">
		<h6 class="h6">Status</h6>
		<h2 class="h2 text-{statusColor}-500">{statusText}</h2>
		<div class="text-{statusColor}-700">{statusSubText}</div>
	</section>
	<hr class="opacity-50 m-3" />
	<section class="p-4 mb-5 text-left h-40">
		<div><strong>Total Documents: </strong>{data.upstream.total}</div>
		<div><strong>Documents in Error: </strong>{data.upstream.inError}</div>
		<br />
		{#if data.meta.systemDiagramUrl}
			<div>
				<a class="anchor" href={data.meta.systemDiagramUrl} target="_blank">System Diagram</a>
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
		{#if data.meta.runbookUrl}
			<div>
				<a class="anchor" href={data.meta.runbookUrl} target="_blank">Runbook</a>
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
		{#if data.meta.contactSlackChannel}
			<div>
				<a class="anchor" href={data.meta.contactSlackChannel} target="_blank">Slack Channel</a>
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
	</section>
	<hr class="opacity-50 m-3" />
	<section class="mx-10 my-5">
		<h6 class="h6 mb-3">Downstreams</h6>
		{#each data.downstreams as downstream}
			<div class="text-left">{downstream.name}</div>
		{/each}
	</section>
	<footer class="card-footer">
		<hr class="opacity-50 my-5" />
		<a href="/{data.upstream.id}">Overview &#8594;</a>
	</footer>
</div>
