<script lang="ts">
	import { page } from '$app/stores';
	import { currentDownstream } from '../../../../stores/downstream';

	export let data;

	currentDownstream.set(data.downstreamData);
</script>

<!-- Page Route Content -->
<slot />
