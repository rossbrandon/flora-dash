<script lang="ts">
	import { page } from '$app/stores';
	import { currentClient } from '$lib/stores/client';

	export let data;

	currentClient.set(data.clients.find((c) => c.clientId === $page.params.client));
</script>

<!-- Page Route Content -->
<slot />
