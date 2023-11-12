<script lang="ts">
	import { ProgressBar, ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import { Status, type Downstream } from '$lib/types/flow.js';
	import { currentClient } from '$lib/stores/client.js';

	export let upstreamId: string;
	export let downstreamData: Downstream;

	const stops: ConicStop[] = [
		{
			label: 'Successful',
			color: 'rgb(var(--color-primary-500))',
			start: 0,
			end: (downstreamData.received / downstreamData.expected) * 100,
		},
		{
			label: 'Not Received',
			color: 'rgb(var(--color-warning-500))',
			start: (downstreamData.received / downstreamData.expected) * 100,
			end:
				(downstreamData.received / downstreamData.expected) * 100 +
				(downstreamData.missing / downstreamData.expected) * 100,
		},
		{
			label: 'In Error',
			color: ['red', 500],
			start:
				(downstreamData.received / downstreamData.expected) * 100 +
				(downstreamData.missing / downstreamData.expected) * 100,
			end: 100,
		},
	];

	const getStatus = () => {
		const THREE_HOURS = 180 * 60 * 1000;

		if (downstreamData.expected == downstreamData.received) {
			return Status.SUCCESSFUL;
		} else if (
			downstreamData.expected > downstreamData.received &&
			new Date().getTime() - downstreamData.lastReceived.timestamp.getTime() < THREE_HOURS
		) {
			return Status.IN_PROGRESS;
		} else {
			return Status.FAILED;
		}
	};

	const getStatusColor = (status: Status) => {
		switch (status) {
			case Status.SUCCESSFUL:
				return 'primary';
			case Status.IN_PROGRESS:
				return 'tertiary';
			case Status.FAILED:
				return 'red';
			default:
				return 'red';
		}
	};

	const status = getStatus();
	const statusColor = getStatusColor(status);
</script>

<div class="card card-hover">
	<header class="card-header">
		<span class="h4">{downstreamData.name}</span>
	</header>
	<section class="p-4 text-left">
		<h6 class="h6">Status</h6>
		<h3 class="h3 text-{statusColor}-500">{status.toString()}</h3>
		<div class="mt-5">
			<strong>Last Received: </strong>{downstreamData.lastReceived.timestamp.toLocaleString()}
		</div>
	</section>
	<hr class="opacity-50 m-3" />
	<section class="mx-10 mt-8 mb-5">
		<ProgressBar
			value={downstreamData.received}
			max={downstreamData.expected}
			height="h-3"
			meter="bg-{statusColor}-500"
			track="bg-{statusColor}-500/30"
		/>
		<span>{downstreamData.received} / {downstreamData.expected}</span>
		<ConicGradient {stops} legend class="mt-5" />
	</section>
	<hr class="opacity-50 m-5" />
	<footer class="card-footer">
		<a href="/{$currentClient?.id}/{upstreamId}/{downstreamData.id}">Details &#8594;</a>
	</footer>
</div>
