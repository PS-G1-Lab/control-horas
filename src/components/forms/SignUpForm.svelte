<script>
	import Input from "@/components/forms/Input.svelte"

	import { ROLE_STATUS, appStatus } from "@/store.ts"
	import {
		validateConfirmPassword,
		validateEmail,
		validatePassword,
		validateUserName,
	} from "@/utils/form-validations.js"

	const ERRORS = {
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
		server: "",
	}

	async function handleUserSignUp(e) {
		e.preventDefault()

		const { userName, email, password, confirmPassword, role } = e.target.elements

		const data = {
			userName: userName.value.trim(),
			email: email.value.trim(),
			password: password.value.trim(),
			confirmPasswd: confirmPassword.value.trim(),
			role: role.value.trim(),
		}

		ERRORS.userName = validateUserName(data.userName)
		ERRORS.email = validateEmail(data.email)
		ERRORS.password = validatePassword(data.password)
		ERRORS.confirmPassword = validateConfirmPassword(data.password, data.confirmPasswd)

		if (ERRORS.userName || ERRORS.email || ERRORS.password || ERRORS.confirmPassword) {
			return
		}

		if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
			const localRole = localStorage.getItem("role")
			if (localRole !== data.role) {
				console.log(
					"¡Atención! 🛑 ¡Este sistema está protegido por una muralla impenetrable! Los hackers encontrarán solo puertas cerradas. 🚪🔒 #SeguridadTotal"
				)
				return
			}
		}

		const formData = new FormData()
		formData.append("userName", data.userName)
		formData.append("email", data.email)
		formData.append("password", data.password)
		formData.append("confirmPassword", data.confirmPasswd)
		formData.append("role", data.role)

		const res = await fetch("/api/signup", {
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

		window.location.href = "/login"
	}

	function showPassword() {
		if (password.type === "password") {
			password.type = "text"
		} else {
			password.type = "password"
		}
	}

	function showConfirmPassword() {
		if (confirmPassword.type === "password") {
			confirmPassword.type = "text"
		} else {
			confirmPassword.type = "password"
		}
	}
</script>

<form class="flex flex-col items-center gap-y-12 lg:w-1/2" on:submit={(e) => handleUserSignUp(e)}>
	<div class="flex flex-col gap-y-2">
		<h1 class="flex justify-center font-sans text-2xl font-bold">
			Registro {$appStatus === ROLE_STATUS.STUDENT ? "alumno" : "profesor"}
		</h1>
		<p class="text-lm flex justify-center font-sans font-bold">
			¿Ya tienes cuenta?
			<a href="/login" class="ml-1 underline text-orange-500">Inicia sesión</a>
		</p>
	</div>
	{#if ERRORS.server}
		<div class="mb-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800" role="alert">
			<span class="font-medium">{ERRORS.server}</span>
		</div>
	{/if}
	<div class="relative flex justify-center w-80">
		<Input type="text" id="userName" content="Nombre completo:" />
	</div>
	{#if ERRORS.userName}
		<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
			<span class="font-medium">{ERRORS.userName}</span>
		</div>
	{/if}
	<div class="relative flex justify-center w-80">
		<Input type="email" id="email" content="Correo:" />
	</div>
	{#if ERRORS.email}
		<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
			<span class="font-medium">{ERRORS.email}</span>
		</div>
	{/if}
	<div class="relative flex justify-center w-80">
		<Input type="password" id="password" content="Contraseña:" />
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
	<div class="relative flex justify-center w-80">
		<Input type="password" id="confirmPassword" content="Confirmar contraseña:" />
		<button
			type="button"
			class="absolute right-2 top-2 w-6 h-6 cursor-pointer"
			id="showConfirmPassword"
			on:click={showConfirmPassword}
		>
			<img
				src="/icons/eye.svg"
				alt="Icono de un ojo"
				class="absolute right-2 top-2 w-6 h-6 cursor-pointer"
			/>
		</button>
	</div>
	{#if ERRORS.confirmPassword}
		<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
			<span class="font-medium">{ERRORS.confirmPassword}</span>
		</div>
	{/if}
	<Input type="hidden" id="role" value={`${$appStatus}`} />
	<input
		type="submit"
		value="Registrarse"
		class="mx-auto w-56 justify-center rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600 cursor-pointer"
	/>
</form>
