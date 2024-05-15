<script>
	import { validateDate, validateDescription, validateHour, validateSubject, validateTitle } from "@/utils/form-validations"
				
	const errors = {
		title: "",
		subject: "",
		startAt: "",
		end: "",
		date: "",
		description: "",
	}
	
	async function handleClassCreation(e) {
		e.preventDefault()

		const { title, subject, startAt, end, date, description } = e.target.elements

		const data = {
			title: title.value.trim(),
			subject: subject.value.trim(),
			startAt: startAt.value.trim(),
			end: end.value.trim(),
			date: date.value.trim(),
			description: description.value.trim(),
		}

		errors.title = validateTitle(data.title)
		if (errors.title) return

		errors.subject = validateSubject(data.subject)
		if (errors.subject) return

		errors.startAt = validateHour(data.startAt)
		if (errors.startAt) return

		errors.end = validateHour(data.end)
		if (errors.end) return

		errors.date = validateDate(data.date)
		if (errors.date) return

		errors.description = validateDescription(data.description)
		if (errors.description) return

		const cookies = document.cookie.split("; ").reduce((prev, current) => {
			const [name, value] = current.split("=")
			prev[name] = value
			return prev
		}, {})

		const formData = new FormData()
		formData.append("userId", cookies.user)
		formData.append("title", data.title)
		formData.append("subject", data.subject)
		formData.append("startAt", data.startAt)
		formData.append("endTime", data.end)
		formData.append("date", data.date)
		formData.append("description", data.description)

		const res = await fetch("/api/createclass", {
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

		window.location.href = "/dashboardteacher"
	}
</script>

<section class="my-3 mb-12 flex w-[580px] flex-col justify-center lg:w-1/2">
	<div
		class="mx-auto my-5 flex w-full items-center justify-center rounded-lg bg-primary px-4 text-white"
	>
		<h1 class="mx-auto py-1 text-2xl mobile:text-3xl sm:text-4xl lg:text-3xl xl:text-4xl">
			Creación de una nueva clase
		</h1>
	</div>
	<form
		method="post"
		class="grid grid-cols-2 gap-4 rounded-lg border-[10px] border-solid border-gray-200 p-4"
		on:submit={(e) => handleClassCreation(e)}
	>
		{#if errors.server}
			<div class="mb-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 col-span-2" role="alert">
				<span class="font-medium">{errors.server}</span>
			</div>
		{/if}
		<div class="col-span-2">
			<label for="title" class="block">Titulo:</label>
			<input
				type="text"
				id="title"
				name="title"
				class="w-full rounded border border-gray-300 p-2"
				required
			/>
		</div>
		<div>
			<label for="subject" class="block">Asignatura:</label>
			<input
				id="subject"
				name="subject"
				class="w-full rounded border border-gray-300 p-2"
				required
			/>
		</div>
		<div>
			<label for="date" class="block">Fecha:</label>
			<input
				type="date"
				id="date"
				name="date"
				class="w-full rounded border border-gray-300 p-2"
				required
			/>
		</div>
		<div>
			<label for="startAt" class="block">Hora de inicio:</label>
			<input
				type="time"
				id="startAt"
				name="startAt"
				class="w-full rounded border border-gray-300 p-2"
				required
			/>
		</div>
		<div>
			<label for="end" class="block">Hora de finalizacion:</label>
			<input
				type="time"
				id="end"
				name="end"
				class="w-full rounded border border-gray-300 p-2"
				required
			/>
		</div>
		<div class="col-span-2">
			<label for="description" class="block">Descripcion:</label>
			<input
				id="description"
				name="description"
				class="w-full rounded border border-gray-300 p-2"
				required
			/>
		</div>
		{#if errors.title}
			<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
				<span class="font-medium">{errors.title}</span>
			</div>
		{/if}
		{#if errors.date}
			<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
				<span class="font-medium">{errors.date}</span>
			</div>
		{/if}
		{#if errors.startAt}
			<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
				<span class="font-medium">{errors.startAt}</span>
			</div>
		{/if}
		{#if errors.end}
			<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
				<span class="font-medium">{errors.end}</span>
			</div>
		{/if}
		{#if errors.description}
			<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
				<span class="font-medium">{errors.description}</span>
			</div>
		{/if}
		{#if errors.subject}
			<div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
				<span class="font-medium">{errors.subject}</span>
			</div>
		{/if}
		<div class="col-span-2 flex justify-between">
			<a href="/dashboardteacher" class="mt-2 rounded-md bg-white px-2 py-1 hover:bg-gray-200"
				>Cancelar</a
			>
			<input
				type="submit"
				value="Crear"
				class="mt-2 rounded-md px-4 py-1 bg-orange-500 font-medium text-white hover:bg-primary cursor-pointer"
			/>
		</div>
	</form>
</section>
