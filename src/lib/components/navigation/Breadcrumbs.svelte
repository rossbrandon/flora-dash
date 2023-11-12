<script lang="ts">
	import { page } from '$app/stores';
	import { currentClient } from '$lib/stores/client';
	import { currentDownstream } from '$lib/stores/downstream';
	import { currentUpstream } from '$lib/stores/upstream';
	import BreadcrumbItem from './BreadcrumbItem.svelte';
</script>

<ol class="breadcrumb">
	<BreadcrumbItem shouldLink={$page.route.id != '/'} href={'/'} text={'Clients'} />
	{#if $page.route.id?.includes('[client]')}
		<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		<BreadcrumbItem
			shouldLink={$page.route.id != '/[client]'}
			href={`/${$currentClient?.id}`}
			text={$currentClient?.name}
		/>
	{/if}

	{#if $page.route.id?.includes('[upstream]')}
		<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		<BreadcrumbItem
			shouldLink={$page.route.id != '/[client]/[upstream]'}
			href={`/${$currentClient?.id}/${$currentUpstream?.id}`}
			text={$currentUpstream?.name}
		/>
	{/if}

	{#if $page.route.id?.includes('[downstream]') && $currentDownstream}
		<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		<BreadcrumbItem shouldLink={false} text={$currentDownstream?.name} />
	{/if}
</ol>
