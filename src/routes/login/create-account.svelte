<script lang="ts">
	import GithubIcon from '$lib/components/ui/icons/github.svelte';
	import GoogleIcon from '$lib/components/ui/icons/google.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl">Create an account</Card.Title>
		<Card.Description>Enter your email below to create your account</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<Button href="google/login" variant="outline">
			<GoogleIcon class="mr-2 h-4 w-4" />
			Google
		</Button>
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<span class="w-full border-t" />
			</div>
			<div class="relative flex justify-center text-xs uppercase">
				<span class="bg-card text-muted-foreground px-2"> Or continue with </span>
			</div>
		</div>
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input disabled id="email" type="email" placeholder="m@example.com" />
		</div>
		<div class="grid gap-2">
			<Label for="password">Password</Label>
			<Input disabled id="password" type="password" />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button disabled class="w-full">Create account</Button>
	</Card.Footer>
</Card.Root>
