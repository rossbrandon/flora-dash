<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { searchFilter } from './searchStore';
	import { goto } from '$app/navigation';
	// import ClientSearch from '$lib/components/search/ClientSearch.svelte';

	export let data;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const handleClick = () => {
		if ($page.route.id != '/') {
			searchFilter.set('');
			goto('/');
		}
	};
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl">Data Flora</strong></a>
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
				<!-- <ClientSearch clients={data.clients} /> -->
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
