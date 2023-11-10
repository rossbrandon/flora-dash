<script lang="ts">
	import { searchFilter } from '../../../stores/search';
	import { type Client, ClientType } from '../../../types/client';

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
		searchFilter.set(data.name);
	};
</script>

<div class="card card-hover">
	<header class="card-header">
		<span class="h4">{data.name}</span>
	</header>
	<section class="p-4 text-left">
		<h6 class="h6">Client Type</h6>
		<span class="h3 text-{clientColor}-500">{data.type.toString()}</span>
		<div class="mt-5"><strong>Device Type: </strong>{data.deviceType}</div>
	</section>
	<hr class="opacity-50 m-5" />
	<footer class="card-footer">
		<a href="/{data.id}" on:click={handleClick}>Data Flows &#8594;</a>
	</footer>
</div>
