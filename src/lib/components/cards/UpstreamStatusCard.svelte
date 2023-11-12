<script lang="ts">
	import { currentClient } from '$lib/stores/client';
	import { Health, type FloraFlow } from '$lib/types/flow';

	export let data: FloraFlow;

	const getStatusSubText = (health: Health) => {
		const unhealthyCount: number | string = data.downstreams.filter(
			(d) => d.health === Health.INVESTIGATION_NEEDED || d.health === Health.UNHEALTHY
		).length;
		const count = unhealthyCount === data.downstreams.length ? 'All' : unhealthyCount;
		const plural = count != 1;
		switch (health) {
			case Health.HEALTHY:
				return 'All data flows are within acceptable limits';
			case Health.INVESTIGATION_NEEDED:
				return `${count} data ${plural ? 'flows fall' : 'flow falls'} below acceptable thresholds`;
			case Health.UNHEALTHY:
				return `${count} data ${plural ? 'flows' : 'flow'} are unhealthy`;
			default:
				return 'Data flow health is unknown';
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

	const health = data.health;
	const statusSubText = getStatusSubText(health);
	const statusColor = getStatusColor(health);
</script>

<div class="card card-hover">
	<header class="card-header">
		<span class="h4">{data.upstream.name}</span>
	</header>
	<section class="p-4 text-left lg:h-32">
		<h6 class="h6">Status</h6>
		<h3 class="h3 text-{statusColor}-500">{data.health.toString()}</h3>
		<div class="mt-2 text-{statusColor}-700">{statusSubText}</div>
	</section>
	<hr class="opacity-50 m-3" />
	<section class="p-4 text-left h-44 overflow-scroll">
		<div class="mb-3"><strong>Downstreams</strong></div>
		{#each data.downstreams as downstream}
			<div class="text-left">
				<span>{downstream.name}</span>
				<span class="px-2">--</span>
				<span class="text-{getStatusColor(downstream.health)}-500">
					{downstream.health.toString()}
				</span>
			</div>
		{/each}
	</section>
	<hr class="opacity-50 m-5" />
	<footer class="card-footer">
		<a href="/{$currentClient?.id}/{data.upstream.id}">Overview &#8594;</a>
	</footer>
</div>
