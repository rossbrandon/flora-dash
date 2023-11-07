<script lang="ts">
	import { ProgressBar, ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import { Status, type Downstream } from '../../types/flow.js';

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

	const getStatusText = (status: Status) => {
		switch (status) {
			case Status.SUCCESSFUL:
				return 'Success';
			case Status.IN_PROGRESS:
				return 'In Progress';
			case Status.FAILED:
				return 'Failed';
			default:
				return 'Failed';
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
	const statusText = getStatusText(status);
	const statusColor = getStatusColor(status);
</script>

<div class="card">
	<header class="card-header">
		<span class="h4">{downstreamData.name}</span>
	</header>
	<section class="p-4 text-left">
		<h6 class="h6">Status</h6>
		<h2 class="h2 text-{statusColor}-500">{statusText}</h2>
	</section>
	<section class="p-4 text-left">
		<h6 class="h6">Last Document Received</h6>
		<div>
			<strong>ID: </strong>
			{downstreamData.lastReceived.id}
		</div>
		<div>
			<strong>Timestamp: </strong>
			{downstreamData.lastReceived.timestamp.toLocaleString()}
		</div>
		<hr class="opacity-50 m-3" />
	</section>
	<section class="mx-10 mb-5">
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
	<footer class="card-footer">
		<hr class="opacity-50 my-5" />
		<a href="/{upstreamId}/{downstreamData.id}">Details &#8594;</a>
	</footer>
</div>
