<script lang="ts">
	import ClientCard from '$lib/components/cards/ClientCard.svelte';
	import { searchFilter } from './searchStore.js';
	import type { Client } from '../types/client.js';

	export let data;

	const getFilteredClients = (searchFilter: string): Client[] => {
		return data.clients.filter((c) => {
			const searchText = searchFilter.split(' ');
			return searchText.every((item) => {
				console.log(c.type.toString() === item);
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

<div class="container h-full mt-20 mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="flex flex-wrap justify-center space-x-5">
			{#each filteredClients as client}
				<ClientCard data={client} />
			{/each}
		</div>
	</div>
</div>
