<script lang="ts">
	import { currentDownstream } from '$lib/stores/downstream';

	export let data;

	currentDownstream.set(data.downstreamData);
</script>

<!-- Page Route Content -->
<slot />
