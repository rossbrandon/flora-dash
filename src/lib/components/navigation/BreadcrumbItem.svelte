<script lang="ts">
	export let shouldLink: boolean = false;
	export let href: string | undefined = undefined;
	export let text: string | undefined;
</script>

<li class="crumb">
	{#if shouldLink}
		<a class="anchor" {href}>{text}</a>
	{:else}
		<span>{text}</span>
	{/if}
</li>
