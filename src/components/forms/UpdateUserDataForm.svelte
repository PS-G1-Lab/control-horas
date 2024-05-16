<script>
	import Input from "@/components/forms/Input.svelte"

	import { validateEmail, validateUserName } from "@/utils/form-validations.js"
	import { getCookies } from "@/utils/session-info.js"

	const ERRORS = {
		userName: "",
		email: "",
		server: "",
	}

	async function updateUserData(e) {
		e.preventDefault()

		const cookies = getCookies()

		const { userName, email } = e.target.elements

		const data = {
			userName: userName.value.trim(),
			email: email.value.trim(),
			sessionToken: cookies.session,
			userId: cookies.user,
		}

		ERRORS.userName = validateUserName(data.userName)
		ERRORS.email = validateEmail(data.email)

		if (ERRORS.userName || ERRORS.email) {
			return
		}

		const formData = new FormData()
		formData.append("userName", data.userName)
		formData.append("email", data.email)
		formData.append("sessionToken", data.sessionToken)
		formData.append("userId", data.userId)

		const res = await fetch("/api/updateUserData", {
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

		window.location.href = "/profile"
	}
</script>

<form class="mb-4 flex flex-col gap-4" on:submit={(e) => updateUserData(e)}>
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
	<input
		type="submit"
		value="Actualizar datos"
		class="mx-auto w-56 justify-center rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600 cursor-pointer"
	/>
</form>
