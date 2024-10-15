<script lang="ts">
	export let href: string = '';
</script>

<a {href} class="hover:underline underline-offset-2" target="_blank">
	<slot />
</a>
