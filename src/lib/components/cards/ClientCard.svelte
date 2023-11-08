<script lang="ts">
	import { currentClient } from '../../../routes/clientStore';
	import { searchFilter } from '../../../routes/searchStore';
	import { type Client, ClientType, DeviceType } from '../../../types/client';

	export let data: Client;

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

	$: clientColor = getClientColor(data.type);

	const handleClick = () => {
		currentClient.set(data);
		searchFilter.set(data.name);
	};
</script>

<div class="card card-hover flex flex-col justify-between w-96 mb-5">
	<header class="card-header">
		<span class="h4">{data.name}</span>
	</header>
	<section class="p-4 text-left">
		<h6 class="h6">Type</h6>
		<h3 class="h3 text-{clientColor}-500">{data.type.toString()}</h3>
	</section>
	<hr class="opacity-50 m-3" />
	<section class="p-4 text-left">
		<div class="mb-3"><strong>Client Info</strong></div>
		<div><strong>Device Type: </strong>{data.deviceType}</div>
		{#if data.userAgent}
			<div><strong>User Agent: </strong>{data.userAgent}</div>
		{/if}
		<div class="mt-3"><strong>Description: </strong>{data.description}</div>
	</section>
	<hr class="opacity-50 m-5" />
	<footer class="card-footer">
		<a href="/{data.id}" on:click={handleClick}>Data Flows &#8594;</a>
	</footer>
</div>
