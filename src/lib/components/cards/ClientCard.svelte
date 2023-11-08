<script lang="ts">
	import { currentClient } from '../../../routes/clientStore';
	import { type Client, ClientType } from '../../../types/client';

	export let data: Client;

	const getClientType = (type: ClientType) => {
		switch (type) {
			case ClientType.INTERNAL:
				return 'Internal';
			case ClientType.EXTERNAL:
				return 'External';
			default:
				return 'Unknown';
		}
	};
</script>

<div class="card w-3/5 flex flex-col justify-between w-96">
	<header class="card-header">
		<span class="h4">{data.name}</span>
	</header>
	<section class="p-4 text-left">
		<h6 class="h6">Type</h6>
		<h3 class="h3">{getClientType(data.type)}</h3>
	</section>
	<hr class="opacity-50 m-3" />
	<section class="p-4 text-left">
		<div class="mb-3"><strong>Client Info</strong></div>
		<div>{data.description}</div>
	</section>
	<hr class="opacity-50 m-5" />
	<footer class="card-footer">
		<a href="/{data.id}" on:click={currentClient.set(data)}>Data Flows &#8594;</a>
	</footer>
</div>
