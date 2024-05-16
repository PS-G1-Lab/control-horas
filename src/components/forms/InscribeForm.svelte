<script>
	export let { classId } = {
		classId: "",
	}
	
	async function handleInscription(e) {
		e.preventDefault()

		const { classId } = e.target.elements
		
		const formData = new FormData()
		formData.append("classId", classId.value.trim())
		console.log(classId.value)

		const res = await fetch("/api/inscribe", {
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
</script>

<form on:submit={(e) => handleInscription(e)}>
	<input type="hidden" name="classId" value={classId} />
	<input
		type="submit"
		value="Inscribirse"
		class="h-fit cursor-pointer justify-center rounded-full bg-orange-500 px-4 py-2 text-center text-lg font-bold text-white hover:bg-primary"
	/>
</form>
