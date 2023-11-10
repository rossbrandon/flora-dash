<script lang="ts">
	import { page } from '$app/stores';
	import { currentClient } from '../../stores/client';

	export let data;

	currentClient.set(data.clients.find((c) => c.id === $page.params.client));
</script>

<!-- Page Route Content -->
<slot />
