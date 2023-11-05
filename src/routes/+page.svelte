<script lang="ts">
	import '../app.postcss';
	import { ProgressBar, ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';

	const data = {
		upstream: {
			total: 1750000,
			inError: 0,
		},
		downstreamX: {
			expected: 3000,
			received: 3000,
			missing: 0,
			inError: 0,
			lastReceived: {
				id: 'efaf12e7-902b-43c8-b04f-3f9207ed0fda',
				timestamp: new Date(2023, 10, 1, 20, 11, 53, 111),
			},
		},
		downstreamY: {
			expected: 1750000,
			received: 751794,
			missing: 1750000 - 751794,
			inError: 0,
			lastReceived: {
				id: 'f129a60f-0f8c-4901-8b92-c41677127b5f',
				timestamp: new Date(Date.now() - 1000 * 420),
			},
		},
		downstreamZ: {
			expected: 1500,
			received: 1035,
			missing: 1500 - 1035 - 350,
			inError: 350,
			lastReceived: {
				id: 'cc3567c8-2886-44b4-a40d-2ccc6b4226a0',
				timestamp: new Date(2023, 10, 1, 15, 37, 21, 342),
			},
		},
	};

	const downstreamX: ConicStop[] = [
		{
			label: 'Successful',
			color: 'rgb(var(--color-primary-500))',
			start: 0,
			end: (data.downstreamX.received / data.downstreamX.expected) * 100,
		},
		{
			label: 'Not Received',
			color: 'rgb(var(--color-warning-500))',
			start: (data.downstreamX.received / data.downstreamX.expected) * 100,
			end:
				(data.downstreamX.received / data.downstreamX.expected) * 100 +
				(data.downstreamX.missing / data.downstreamX.expected) * 100,
		},
		{
			label: 'In Error',
			color: ['red', 500],
			start:
				(data.downstreamX.received / data.downstreamX.expected) * 100 +
				(data.downstreamX.missing / data.downstreamX.expected) * 100,
			end: 100,
		},
	];
	const downstreamY: ConicStop[] = [
		{
			label: 'Successful',
			color: 'rgb(var(--color-primary-500))',
			start: 0,
			end: (data.downstreamY.received / data.downstreamY.expected) * 100,
		},
		{
			label: 'Not Received',
			color: 'rgb(var(--color-warning-500))',
			start: (data.downstreamY.received / data.downstreamY.expected) * 100,
			end:
				(data.downstreamY.received / data.downstreamY.expected) * 100 +
				(data.downstreamY.missing / data.downstreamY.expected) * 100,
		},
		{
			label: 'In Error',
			color: ['red', 500],
			start:
				(data.downstreamY.received / data.downstreamY.expected) * 100 +
				(data.downstreamY.missing / data.downstreamY.expected) * 100,
			end: 100,
		},
	];
	const downstreamZ: ConicStop[] = [
		{
			label: 'Successful',
			color: 'rgb(var(--color-primary-500))',
			start: 0,
			end: (data.downstreamZ.received / data.downstreamZ.expected) * 100,
		},
		{
			label: 'Not Received',
			color: 'rgb(var(--color-warning-500))',
			start: (data.downstreamZ.received / data.downstreamZ.expected) * 100,
			end:
				(data.downstreamZ.received / data.downstreamZ.expected) * 100 +
				(data.downstreamZ.missing / data.downstreamZ.expected) * 100,
		},
		{
			label: 'In Error',
			color: ['red', 500],
			start:
				(data.downstreamZ.received / data.downstreamZ.expected) * 100 +
				(data.downstreamZ.missing / data.downstreamZ.expected) * 100,
			end: 100,
		},
	];
</script>

<div class="container h-full mt-20 mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="flex justify-center space-x-5">
			<div class="card">
				<header class="card-header">Downstream X</header>
				<section class="p-4 text-left">
					<h6 class="h6">Status</h6>
					<h2 class="h2 text-primary-500">Success</h2>
				</section>
				<section class="p-4 text-left">
					<h6 class="h6">Last Document Received</h6>
					<span>
						<strong>ID: </strong>
						{data.downstreamX.lastReceived.id}
					</span>
					<span>
						<strong>Timestamp: </strong>
						{data.downstreamX.lastReceived.timestamp.toLocaleString()}
					</span>
					<hr class="opacity-50 m-3" />
				</section>
				<section class="mx-10 mb-5">
					<ProgressBar
						value={100}
						max={100}
						height="h-3"
						meter="bg-primary-500"
						track="bg-primary-500/30"
					/>
					<span>{100}%</span>
					<ConicGradient stops={downstreamX} legend class="mt-5" />
				</section>
				<footer class="card-footer">
					<hr class="opacity-50 my-5" />
					<a href="/detail">Details &#8594;</a>
				</footer>
			</div>
			<div class="card">
				<header class="card-header">Downstream Y</header>
				<section class="p-4 text-left">
					<h6 class="h6">Status</h6>
					<h2 class="h2 text-tertiary-500">In Progress</h2>
				</section>
				<section class="p-4 text-left">
					<h6 class="h6">Last Document Received</h6>
					<span>
						<strong>ID: </strong>
						{data.downstreamY.lastReceived.id}
					</span>
					<span>
						<strong>Timestamp: </strong>
						{data.downstreamY.lastReceived.timestamp.toLocaleString()}
					</span>
					<hr class="opacity-50 m-3" />
				</section>
				<section class="mx-10 mb-5">
					<ProgressBar
						value={43}
						max={100}
						height="h-3"
						meter="bg-tertiary-500"
						track="bg-tertiary-500/30"
					/>
					<span>{43}%</span>
					<ConicGradient stops={downstreamY} legend class="mt-5" />
				</section>
				<footer class="card-footer">
					<hr class="opacity-50 my-5" />
					<a href="/detail">Details &#8594;</a>
				</footer>
			</div>
			<div class="card">
				<header class="card-header">Downstream Z</header>
				<section class="p-4 text-left">
					<h6 class="h6">Status</h6>
					<h2 class="h2 text-red-500">Failed</h2>
				</section>
				<section class="p-4 text-left">
					<h6 class="h6">Last Document Received</h6>
					<span>
						<strong>ID: </strong>
						{data.downstreamZ.lastReceived.id}
					</span>
					<span>
						<strong>Timestamp: </strong>
						{data.downstreamZ.lastReceived.timestamp.toLocaleString()}
					</span>
					<hr class="opacity-50 m-3" />
				</section>
				<section class="mx-10 mb-5">
					<ProgressBar value={75} max={100} height="h-3" meter="bg-red-500" track="bg-red-500/30" />
					<span>{75}%</span>
					<ConicGradient stops={downstreamZ} legend class="mt-5" />
				</section>
				<footer class="card-footer">
					<hr class="opacity-50 my-5" />
					<a href="/detail">Details &#8594;</a>
				</footer>
			</div>
		</div>
	</div>
</div>
