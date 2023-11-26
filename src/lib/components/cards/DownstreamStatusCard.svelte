<script lang="ts">
	import { Doughnut } from 'svelte-chartjs';
	import 'chart.js/auto';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { Status, type Downstream } from '$lib/types/flow.js';
	import { currentClient } from '$lib/stores/client.js';
	import type { ChartData } from 'chart.js/auto';

	export let upstreamId: string;
	export let downstream: Downstream;

	const getStatus = () => {
		const THREE_HOURS = 180 * 60 * 1000;

		if (downstream.expected == downstream.received) {
			return Status.SUCCESSFUL;
		} else if (
			downstream.expected > downstream.received &&
			new Date().getTime() - new Date(downstream.lastReceived.timestamp).getTime() < THREE_HOURS
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

	const donutData: ChartData<'doughnut', number[]> = {
		datasets: [
			{
				data: [downstream.received, downstream.missing, downstream.inError],
				// these are hard coded values for skeleton's default theme
				// need to find a dynamic way to pass these in
				backgroundColor: ['#0fba81', '#eab308', '#ef4444'],
			},
		],
		labels: ['Successful', 'Not Received', 'In Error'],
	};
</script>

<div class="card">
	<header class="card-header">
		<span class="h4">{downstream.name}</span>
	</header>
	<section class="p-4 text-left">
		<h6 class="h6">Status</h6>
		<h3 class="h3 text-{statusColor}-500">
			{status
				.toString()
				.replace(/([A-Z])/g, ' $1')
				.trim()}
		</h3>
		<div class="mt-5">
			<strong>Last Received: </strong>{new Date(downstream.lastReceived.timestamp).toLocaleString()}
		</div>
	</section>
	<hr class="opacity-50 m-3" />
	<section class="mx-10 mt-8 mb-5 text-center">
		<ProgressBar
			value={downstream.received}
			max={downstream.expected}
			height="h-3"
			meter="bg-{statusColor}-500"
			track="bg-{statusColor}-500/30"
		/>
		<span>{downstream.received} / {downstream.expected}</span>
		<div class="mt-5">
			<Doughnut data={donutData} options={{ responsive: true }} />
		</div>
	</section>
	<hr class="opacity-50 m-5" />
	<footer class="card-footer">
		<a href="/{$currentClient?.clientId}/{upstreamId}/{downstream.downstreamId}">Details &#8594;</a>
	</footer>
</div>
