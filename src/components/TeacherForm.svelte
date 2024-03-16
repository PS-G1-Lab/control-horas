<script>
	import Input from "@/components/Input.svelte"
	import SelectInput from "@/components/SelectInput.svelte"
	import Title from "@/components/Title.svelte"
</script>

<img
	src="/img/teacher-in-class.svg"
	alt="Imagen de profesor delante de la pizarra"
	class="hidden lg:inline-block mr-10 w-auto object-contain aspect-w-1 aspect-h-1 "
/>
<form class="flex flex-col items-center gap-y-12 lg:w-1/2 ">
	<div class="flex flex-col gap-y-2">
		<Title title="Registro profesor" />
		<h2 class="text-lm flex justify-center font-sans font-bold">
				¿Ya tienes cuenta?&nbsp
				<a href="/login" class="underline text-orange-500">Inicia sesión</a>
		</h2>
	</div>
	<div class="relative flex justify-center w-80">
		<Input type="text" id="name" content="Nombre:" placeholder=" " />
	</div>
	<div class="relative flex justify-center w-80">
		<Input type="email" id="mail" content="Correo:" placeholder=" " />
	</div>
	<div class="relative flex justify-center w-80">
		<Input type="password" id="passwd" content="Contraseña:" placeholder=" " />
	</div>
	<div class="relative flex justify-center w-80">
		<Input type="password" id="confirmPasswd" content="Confirmar contraseña:" placeholder=" " />
	</div>
	<SelectInput />
	<button
		type="submit"
		class="mx-auto w-56 justify-center rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600"
	>
		Registrarse
	</button>
</form>
