<script lang="ts">
	import StatusCard from './StatusCard.svelte';

	export let data;
</script>

<div class="container h-full mt-20 mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="flex justify-center space-x-5">
			{#each data.flowData.downstreams as downstream}
				<StatusCard downstreamData={downstream} />
			{/each}
		</div>
	</div>
</div>
