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
					c.id.toLowerCase().includes(item.toLowerCase()) ||
					c.name.toLowerCase().includes(item.toLowerCase()) ||
					c.description?.toLowerCase().includes(item.toLowerCase()) ||
					c.type.toString().toLowerCase().includes(item.toLowerCase()) ||
					c.deviceType.toString().toLowerCase().includes(item.toLowerCase())
				);
			});
		});
	};

	$: filteredClients = getFilteredClients($searchFilter);
</script>

<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 m-20 gap-5">
	{#each filteredClients as client}
		<ClientCard {client} />
	{/each}
</div>
