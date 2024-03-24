<script>
	import Input from "@/components/forms/Input.svelte"

	const errors = {
		email: "",
		password: "",
		server: "",
	}

	async function handleUserLogIn(e) {
		e.preventDefault()

		const { email, password } = e.target.elements

		const data = {
			email: email.value.trim(),
			password: password.value.trim(),
		}

		if (data.email === "") {
			errors.email = "Este email es requerido"
			return
		} else errors.email = ""

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(data.email)) {
			errors.email = "El correo no es válido"
			return
		}

		if (data.password === "") {
			errors.password = "La contraseña es requerida"
			return
		} else errors.password = ""

		if (data.password.length < 8) {
			errors.password = "La contraseña debe ser de al menos 8 caracteres"
			return
		}

		const formData = new FormData()
		formData.append("email", data.email)
		formData.append("password", data.password)

		const res = await fetch("/api/login", {
			method: "POST",
			body: formData,
		})

		if (!res.ok) {
			const error = await res.json()
			errors.server = error.message
			return
		}

		const result = await res.json()

		if (result?.error) {
			errors.server = result.error
			return
		}

		// Create a session cokie to permit access to the dashboard
		document.cookie = `session=${data.email}; path=/; max-age=3600; samesite=strict; secure`

		window.location.href = "/dashboard"
	}
</script>

<section class="flex flex-col items-center">
	<h2 class="text-lm flex justify-center font-sans font-bold mb-10">
		¿Es tu primera vez?
		<a href="/signup" class="ml-1 text-primary underline">Regístrate</a>
	</h2>
	<form class="flex flex-col gap-y-12" method="post" on:submit={(e) => handleUserLogIn(e)}>
		{#if errors.serverError}
			<div class="mb-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800" role="alert">
				<span class="font-medium">{errors.serverError}</span>
			</div>
		{/if}
		<div class="relative">
			<Input type="email" id="email" content="Correo:" placeholder=" " required="true" />
		</div>
		{#if errors.email}
			<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
				<span class="font-medium">{errors.email}</span>
			</div>
		{/if}
		<div class="relative">
			<Input type="password" id="password" content="Contraseña:" placeholder=" " required="true" />
		</div>
		{#if errors.password}
			<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
				<span class="font-medium">{errors.password}</span>
			</div>
		{/if}
		<input
			type="submit"
			value="Iniciar sesión"
			class="mx-auto w-56 justify-center rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600 cursor-pointer"
		/>
	</form>
	<a href="/update" class="mt-10 font-sans font-bold underline">¿Olvidaste tu contraseña?</a>
</section>
