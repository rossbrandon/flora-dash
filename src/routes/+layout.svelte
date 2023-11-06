<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	export let data;
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl">Data Flora</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<input
					class="input w-full"
					title="Tenant Search"
					type="text"
					placeholder="Search for a tenant..."
				/>
			</svelte:fragment>
			<svelte:fragment slot="headline">
				<ol class="breadcrumb">
					<li class="crumb"><a class="anchor" href="/">{data.flowData.upstream.name}</a></li>
					<li class="crumb-separator" aria-hidden>&rsaquo;</li>
					<li class="crumb"><a class="anchor" href="/">{data.flowData.tenant.name}</a></li>
					<li class="crumb-separator" aria-hidden>&rsaquo;</li>
					<li>Overview</li>
				</ol>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
