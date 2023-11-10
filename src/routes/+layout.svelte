<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { AppShell, AppBar, LightSwitch, Modal } from '@skeletonlabs/skeleton';
	import { storePopup, initializeStores } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { goto } from '$app/navigation';
	import Breadcrumbs from '$lib/components/navigation/Breadcrumbs.svelte';
	import { currentClient } from '../stores/client';
	import { currentUpstream } from '../stores/upstream';
	import { currentDownstream } from '../stores/downstream';
	import { searchFilter } from '../stores/search';

	// initialize skeleton popup and modals
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	const resetState = () => {
		searchFilter.set('');
		currentClient.set(undefined);
		currentUpstream.set(undefined);
		currentDownstream.set(undefined);
	};

	const handleClick = () => {
		if ($page.route.id != '/') {
			resetState();
			goto('/');
		}
	};

	$: if ($page.route.id === '/') resetState();
</script>

<!-- Initialize skeleton modal -->
<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" on:click={handleClick}><strong class="text-xl">Data Flora</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<input
					class="input w-full"
					title="Data Flow Search"
					type="search"
					placeholder="Search for a data flow..."
					bind:value={$searchFilter}
					on:click={handleClick}
				/>
			</svelte:fragment>
			<svelte:fragment slot="headline">
				<Breadcrumbs />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
