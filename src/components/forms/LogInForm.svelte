<script>
	import Input from "@/components/forms/Input.svelte"
	import { onMount } from 'svelte';

	import { validateEmail, validatePassword } from "@/utils/form-validations.js"

	const ERRORS = {
		email: "",
		password: "",
		server: "",
	}

	async function checkLogged() {
		const session = document.cookie.split("; ").find((row) => row.startsWith("session"))
		const user = document.cookie.split("; ").find((row) => row.startsWith("user"))

		if (session && user) {
			const formData = new FormData()
			formData.append("sessionToken", session.split("=")[1])
			formData.append("userId", user.split("=")[1])

			const res = await fetch("/api/checkSession", {
				method: "POST",
				body: formData,
			})

			const result = await res.json()

			if (!res.ok) {
				ERRORS.server = result.message
				return
			}

			if (result.error) {
				ERRORS.server = result.error
				return
			}

			window.location.href = "/dashboard"
		}
	}

	onMount(() => {
		checkLogged()
	})

	async function handleUserLogIn(e) {
		e.preventDefault()

		const { email, password } = e.target.elements

		const data = {
			email: email.value.trim(),
			password: password.value.trim(),
		}

		ERRORS.email = validateEmail(data.email)
		ERRORS.password = validatePassword(data.password)

		if (ERRORS.email || ERRORS.password) {
			return
		}

		const formData = new FormData()
		formData.append("email", data.email)
		formData.append("password", data.password)

		const res = await fetch("/api/login", {
			method: "POST",
			body: formData,
		})

		const result = await res.json()

		if (!res.ok) {
			ERRORS.server = result.message
			return
		}

		if (result.error) {
			ERRORS.server = result.error
			return
		}

		document.cookie = `session=${result.sessionToken}; path=/; samesite=strict secure`
		document.cookie = `user=${result.userId}; path=/; samesite=strict secure`

		window.location.href = "/dashboard"
	}

	function showPassword() {
		if (password.type === "password") {
			password.type = "text"
		} else {
			password.type = "password"
		}
	}
</script>

<section class="flex flex-col items-center">
	<h2 class="text-lm flex justify-center font-sans font-bold mb-10">
		¿Es tu primera vez?
		<a href="/signup" class="ml-1 text-primary underline">Regístrate</a>
	</h2>
	<form class="flex flex-col gap-y-12" method="post" on:submit={(e) => handleUserLogIn(e)}>
		{#if ERRORS.serverError}
			<div class="mb-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800" role="alert">
				<span class="font-medium">{ERRORS.serverError}</span>
			</div>
		{/if}
		<div class="relative">
			<Input type="email" id="email" content="Correo:" placeholder=" " required="true" />
		</div>
		{#if ERRORS.email}
			<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
				<span class="font-medium">{ERRORS.email}</span>
			</div>
		{/if}
		<div class="relative">
			<Input type="password" id="password" content="Contraseña:" placeholder=" " required="true" />
			<button
				type="button"
				class="absolute right-2 top-2 w-6 h-6 cursor-pointer"
				id="showPassword"
				on:click={showPassword}
			>
				<img
					src="/icons/eye.svg"
					alt="Icono de un ojo"
					class="absolute right-2 top-2 w-6 h-6 cursor-pointer"
				/>
			</button>
		</div>
		{#if ERRORS.password}
			<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
				<span class="font-medium">{ERRORS.password}</span>
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
