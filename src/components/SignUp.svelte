<script>
	import SignUpForm from "@/components/forms/SignUpForm.svelte"

	import { ROLE_STATUS, appStatus } from "@/store.ts"
</script>

<div class="flex justify-around">
	{#if $appStatus === ROLE_STATUS.TEACHER}
		<img
			src="/img/teacher-in-class.svg"
			alt="Imagen de profesor delante de la pizarra"
			class="hidden lg:inline-block mr-10 w-auto object-contain aspect-w-1 aspect-h-1"
		/>
	{/if}
	<SignUpForm />
	{#if $appStatus === ROLE_STATUS.STUDENT}
		<img
			src="/img/girl-studing.svg"
			alt="Imagen de alumna sentada en un pupitre"
			class="hidden lg:inline-block w-auto object-contain aspect-w-1 aspect-h-1"
		/>
	{/if}
</div>
