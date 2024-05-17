<script>
	export let { classId, userId, sessionToken } = {
		classId: "",
		userId: "",
		sessionToken: "",
	}

	const ERRORS = {
		server: "",
	}

	async function handleDelete(e) {
		e.preventDefault()

		const { classId, userId, sessionToken } = e.target.elements

		const data = {
			classId: classId.value.trim(),
			userId: userId.value.trim(),
			sessionToken: sessionToken.value.trim(),
		}

		const formData = new FormData()
		formData.append("userId", data.userId)
		formData.append("sessionToken", data.sessionToken)
		formData.append("classId", data.classId)

		const res = await fetch("/api/deleteclass", {
			method: "POST",
			body: formData,
		})

		const result = await res.json()
		console.log(result)
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
</script>

{#if ERRORS.server}
	<div class="mb-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800" role="alert">
		<span class="font-medium">{ERRORS.server}</span>
	</div>
{/if}
<form on:submit={(e) => handleDelete(e)}>
	<input type="hidden" name="classId" value={classId} />
	<input type="hidden" name="userId" value={userId} />
	<input type="hidden" name="sessionToken" value={sessionToken} />
	<input
		type="submit"
		value="Eliminar clase"
		class="mx-auto w-56 justify-center rounded-full bg-orange-500 py-2 text-lg font-bold text-white hover:bg-primary"
	/>
</form>
