<script>
	import Input from "./Input.svelte"
	import Title from "./Title.svelte"
</script>

<form class="flex flex-col gap-y-12 lg:w-1/2">
	<Title title="Registro alumno" />
	<div class="relative">
		<Input type="text" id="name" content="Nombre:" placeholder=" " />
	</div>
	<div class="relative">
		<Input type="email" id="mail" content="Correo:" placeholder=" " />
	</div>
	<div class="relative">
		<Input type="password" id="passwd" content="Contraseña:" placeholder=" " />
	</div>
	<div class="relative">
		<Input type="password" id="confirmPasswd" content="Confirmar contraseña:" placeholder=" " />
	</div>
	<button
		type="submit"
		class="mx-auto w-56 justify-center rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600"
	>
		Registrarse
	</button>
</form>
<img src="/img/girl-studing.svg" alt="Imagen de alumna sentada en un pupitre" class="hidden lg:inline-block" />
