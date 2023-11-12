<script lang="ts">
	import { goto } from '$app/navigation';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import type { Client } from '$lib/types/client';
	import { currentClient } from '$lib/stores/client';

	export let clients: Client[];

	let searchInput = '';

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom',
	};

	const getOptions = () => {
		let list: AutocompleteOption<string, Client>[] = [];
		clients.forEach((c) => {
			const descKeywords = c.description?.split(' ');
			const item = {
				label: c.name,
				value: c.id,
				keywords: descKeywords?.join(', '),
				meta: c,
			};
			list.push(item);
		});
		return list;
	};

	const options: AutocompleteOption<string>[] = getOptions();

	function onSelect(event: CustomEvent<AutocompleteOption<string, Client>>): void {
		const client: Client | undefined = event.detail.meta;
		searchInput = client?.name ?? '';
		currentClient.set(client);
		goto(`/${client?.id ?? ''}`);
	}
</script>

<input
	class="input w-full"
	title="Data Flow Search"
	type="search"
	placeholder="Search for a data flow..."
	bind:value={searchInput}
	use:popup={popupSettings}
/>

<div class="bg-surface-500 w-5/6 rounded-lg" data-popup="popupAutocomplete">
	<Autocomplete bind:input={searchInput} {options} on:selection={onSelect} />
</div>
