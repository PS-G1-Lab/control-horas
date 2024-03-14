<script >
	import Input from "@/components/Input.astro"

	import { ROLE_STATUS, appStatus } from "@/store.ts"
</script>

<div class="flex flex-row items-center justify-between px-80 pt-11 pb-20">
	<form class="flex flex-col gap-y-12">
		{#if $appStatus === ROLE_STATUS.STUDENT}
			<p class="flex justify-center font-sans text-2xl font-bold">
				Registro alumno
			</p>
			<div class="relative">
				<input type="text" id="name" class="border-b-2 border-solid border-black" placeholder=" " />
				<label for="name">Nombre:</label>
			</div>
			<button
				type="submit"
				class="mx-auto w-56 justify-center rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600"
			>
				Registrarse
			</button>
		{:else if $appStatus === ROLE_STATUS.TEACHER}
			<p class="flex justify-center font-sans text-2xl font-bold">
				Registro profesor
			</p>
			<div class="relative">
				<input type="text" id="name" class="border-b-2 border-solid border-black" placeholder=" " />
				<label for="name">Nombre:</label>
			</div>
			<button
				type="submit"
				class="mx-auto w-56 justify-center rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600"
			>
				Registrarse
			</button>
		{/if}
	</form>
</div>

<style>
	input {
		width: 100%;
		background-color: none;
		padding-top: 0.6em;
		padding-bottom: 0.6em;
		outline: none;
	}

	label {
		color: #4c4c4c;
		cursor: pointer;
		position: absolute;
		top: 0;
		transform: translateY(10px);
		transition:
			transform 0.5s,
			color 0.3s;
	}

	input:first-child {
		margin-right: 10em;
	}

	input:focus + label,
	input:not(:placeholder-shown) + label {
		transform: translateY(-12px) scale(1);
		transform-origin: left top;
		color: #e6622e;
	}
</style>
