<script lang="ts">
	import { currentUpstream } from '../../../stores/upstream';

	export let data;

	currentUpstream.set(data.upstreamData.upstream);
</script>

<!-- Page Route Content -->
<slot />
