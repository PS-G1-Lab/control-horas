<script>
	import Input from "@/components/forms/Input.svelte"

	import { validateConfirmPassword, validatePassword } from "@/utils/form-validations.js"
	import { getCookies } from "@/utils/session-info.js"

	const ERRORS = {
		password: "",
		confirmPassword: "",
		server: "",
	}

	async function updateUserPassword(e) {
		e.preventDefault()

		const cookies = getCookies()

		const { password, confirmPassword } = e.target.elements

		const data = {
			password: password.value.trim(),
			confirmPasswd: confirmPassword.value.trim(),
			sessionToken: cookies.session,
			userId: cookies.user,
		}

		ERRORS.password = validatePassword(data.password)
		ERRORS.confirmPassword = validateConfirmPassword(data.password, data.confirmPasswd)

		if (ERRORS.password || ERRORS.confirmPassword) {
			return
		}

		const formData = new FormData()
		formData.append("password", data.password)
		formData.append("confirmPassword", data.confirmPasswd)
		formData.append("sessionToken", data.sessionToken)
		formData.append("userId", data.userId)

		const res = await fetch("/api/updateUserPassword", {
			method: "POST",
			body: formData,
		})

		const result = await res.json()

		if (!res.ok) {
			ERRORS.server = result.message
			return
		}

		if (result.error) {
			ERRORS.server = result.error[0].message
			return
		}

		window.location.href = "/profile"
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

<form class="flex flex-col items-center" on:submit={(e) => updateUserPassword(e)}>
	<h2 class="mb-4 mr-32 text-2xl font-bold">Nueva Contraseña</h2>
	<div class="mb-4">
		{#if ERRORS.server}
			<div class="mb-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800" role="alert">
				<span class="font-medium">{ERRORS.server}</span>
			</div>
		{/if}
		<div class="relative flex justify-center w-80 my-10">
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
		<div class="relative flex justify-center w-80 my-10">
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
		<a href="/profile" class="mx-auto justify-center rounded-full bg-gray-200 my-10 px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-300">Cancelar</a>
		<input
			type="submit"
			value="Cambiar contraseña"
			class="mx-auto w-56 justify-center rounded-full bg-orange-500 my-10 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600 cursor-pointer"
		/>
	</div>
</form>
