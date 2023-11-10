<script lang="ts">
	import ClientCard from '$lib/components/cards/ClientCard.svelte';
	import { searchFilter } from '../stores/search.js';
	import type { Client } from '../types/client.js';

	export let data;

	const getFilteredClients = (searchFilter: string): Client[] => {
		return data.clients.filter((c) => {
			const searchText = searchFilter.split(' ');
			return searchText.every((item) => {
				return (
					c.id.toLowerCase().includes(item.toLowerCase()) ||
					c.name.toLowerCase().includes(item.toLowerCase()) ||
					c.description.toLowerCase().includes(item.toLowerCase()) ||
					c.type.toString().toLowerCase().includes(item.toLowerCase()) ||
					c.deviceType.toString().toLowerCase().includes(item.toLowerCase())
				);
			});
		});
	};

	$: filteredClients = getFilteredClients($searchFilter);
</script>

<div class="grid grid-cols-4 m-20 gap-5">
	{#each filteredClients as client}
		<ClientCard data={client} />
	{/each}
</div>
