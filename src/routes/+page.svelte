<script lang="ts">
	import ClientCard from '$lib/components/cards/ClientCard.svelte';
	import { searchFilter } from '$lib/stores/search';
	import type { Client } from '$lib/types/client';

	export let data;

	const getFilteredClients = (searchFilter: string): Client[] => {
		return data.clients.filter((c) => {
			const searchText = searchFilter.split(' ');
			return searchText.every((item) => {
				return (
					c.clientId.toLowerCase().includes(item.toLowerCase()) ||
					c.name.toLowerCase().includes(item.toLowerCase()) ||
					c.description?.toLowerCase().includes(item.toLowerCase()) ||
					c.clientType.toString().toLowerCase().includes(item.toLowerCase()) ||
					c.deviceType.toString().toLowerCase().includes(item.toLowerCase())
				);
			});
		});
	};

	$: filteredClients = getFilteredClients($searchFilter);
</script>

<div class="grid grid-cols-4 m-5 gap-5">
	<div class="col-span-4">
		<h3 class="h3 text-center m-5">Clients</h3>
	</div>
	{#each filteredClients as client}
		<div class="col-span-4 md:col-span-2 lg:col-span-1">
			<ClientCard {client} />
		</div>
	{/each}
</div>
