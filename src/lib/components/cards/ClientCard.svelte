<script lang="ts">
	import { searchFilter } from '$lib/stores/search';
	import { type Client, ClientType } from '$lib/types/client';

	export let client: Client;

	const getClientColor = (type: ClientType) => {
		switch (type) {
			case ClientType.INTERNAL:
				return 'primary';
			case ClientType.EXTERNAL:
				return 'tertiary';
			default:
				return 'red';
		}
	};

	$: clientColor = getClientColor(client.clientType);

	const handleClick = () => {
		searchFilter.set(client.name);
	};
</script>

<div class="card card-hover">
	<header class="card-header">
		<span class="h4">{client.name}</span>
		<div><span class="font-thin">{client.clientId}</span></div>
	</header>
	<section class="p-4 text-left">
		<h6 class="h6">Client Type</h6>
		<span class="h3 text-{clientColor}-500">{client.clientType.toString()}</span>
		<div class="mt-5"><strong>Device Type: </strong>{client.deviceType}</div>
	</section>
	<hr class="opacity-50 m-5" />
	<footer class="card-footer">
		<a href="/{client.clientId}" on:click={handleClick}>Data Flows &#8594;</a>
	</footer>
</div>
