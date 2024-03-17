<script>
	import Input from "@/components/Input.svelte"
	import Title from "@/components/Title.svelte"
	// import SelectInput from "@/components/SelectInput.svelte"

	const errors = {
		userNameError: "",
		emailError: "",
		passwordError: "",
		confirmPasswordError: "",
	}

	async function handleUserSignUp(e) {
		e.preventDefault()

		const { userName, email, password, confirmPassword, role } = e.target.elements

		const data = {
			userName: userName.value,
			email: email.value,
			password: password.value,
			confirmPasswd: confirmPassword.value,
			role: role.value,
		}

		if (data.userName === "") {
			errors.userNameError = "El nombre es requerido"
			return
		} else errors.userNameError = ""

		if (data.userName.length < 3) {
			errors.userNameError = "El nombre debe ser de al menos 3 caracteres"
			return
		}

		if (data.email === "") {
			errors.emailError = "Este email es requerido"
			return
		} else errors.emailError = ""

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(data.email)) {
			errors.emailError = "El correo no es válido"
			return
		}

		if (data.password === "") {
			errors.passwordError = "La contraseña es requerida"
			return
		} else errors.passwordError = ""

		if (data.password.length < 8) {
			errors.passwordError = "La contraseña debe ser de al menos 8 caracteres"
			return
		}

		if (data.password !== data.confirmPasswd) {
			errors.confirmPasswordError = "Las contraseñas no coinciden"
			return
		} else errors.confirmPasswordError = ""

		console.log(data)

		const formData = new FormData()
		formData.append("userName", data.userName)
		formData.append("email", data.email)
		formData.append("password", data.password)
		formData.append("role", data.role)

		const res = await fetch("/api/signup", {
			method: "POST",
			body: formData,
		})

		if (!res.ok) {
			const error = await res.json()
			errors.serverError = error.message
			return
		}

		const result = await res.json()
		console.log(result)
	}
</script>

<img
	src="/img/teacher-in-class.svg"
	alt="Imagen de profesor delante de la pizarra"
	class="hidden lg:inline-block mr-10 w-auto object-contain aspect-w-1 aspect-h-1"
/>
<form class="flex flex-col items-center gap-y-12 lg:w-1/2" on:submit={(e) => handleUserSignUp(e)}>
	<div class="flex flex-col gap-y-2">
		<Title title="Registro profesor" />
		<h2 class="text-lm flex justify-center font-sans font-bold">
			¿Ya tienes cuenta?
			<a href="/login" class=" ml-1 underline text-orange-500">Inicia sesión</a>
		</h2>
	</div>
	<div class="relative flex justify-center w-80">
		<Input type="text" id="userName" content="Nombre:" />
	</div>
	{#if errors.userNameError}
		<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
			<span class="font-medium">{errors.userNameError}</span>
		</div>
	{/if}
	<div class="relative flex justify-center w-80">
		<Input type="email" id="email" content="Correo:" />
	</div>
	{#if errors.emailError}
		<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
			<span class="font-medium">{errors.emailError}</span>
		</div>
	{/if}
	<div class="relative flex justify-center w-80">
		<Input type="password" id="password" content="Contraseña:" />
	</div>
	{#if errors.passwordError}
		<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
			<span class="font-medium">{errors.passwordError}</span>
		</div>
	{/if}
	<div class="relative flex justify-center w-80">
		<Input type="password" id="confirmPassword" content="Confirmar contraseña:" />
	</div>
	{#if errors.confirmPasswordError}
		<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
			<span class="font-medium">{errors.confirmPasswordError}</span>
		</div>
	{/if}
	<Input type="hidden" id="role" value="1" />
	<!-- <SelectInput /> -->
	<input
		type="submit"
		value="Registrarse"
		class="mx-auto w-56 justify-center rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600"
	/>
</form>
