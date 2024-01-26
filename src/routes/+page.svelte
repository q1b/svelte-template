<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;
</script>

<section class="flex min-h-screen flex-col place-items-center gap-y-6 p-10">
	<p class="text-xl">Your User ID is {data.user.id}</p>
	<h1 class="text-3xl font-bold">Welcome {data.user.name}</h1>
	<p class="text-xl">Your Gmail Address is {data.user.gmail}</p>
	<Button href="/google/logout" variant="destructive">Logout</Button>
</section>
