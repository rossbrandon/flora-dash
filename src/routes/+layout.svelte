<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl">Data Flora</strong>
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
				<span>Upstream A</span>
				<span class="text-xl mx-2">::</span>
				<span>Acme</span>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
