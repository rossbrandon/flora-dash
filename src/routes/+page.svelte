<script lang="ts">
	import ClientCard from '$lib/components/cards/ClientCard.svelte';

	export let data;
</script>

<div class="container h-full mt-20 mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="flex justify-center space-x-5">
			{#each data.clients as client}
				<ClientCard data={client} />
			{/each}
		</div>
	</div>
</div>
