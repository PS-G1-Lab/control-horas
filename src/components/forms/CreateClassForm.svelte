<section class="my-3 mb-12 flex w-[580px] flex-col justify-center lg:w-1/2">
	<div
		class="mx-auto my-5 flex w-full items-center justify-center rounded-lg bg-primary px-4 text-white"
	>
		<h1 class="mx-auto py-1 text-2xl mobile:text-3xl sm:text-4xl lg:text-3xl xl:text-4xl">
			Creación de una nueva clase
		</h1>
	</div>
	<form
		action="/new_class"
		method="post"
		class="grid grid-cols-2 gap-4 rounded-lg border-[10px] border-solid border-gray-200 p-4"
	>
		<div class="flex flex-col">
			<label for="title" class="block">Titulo:</label>
			<input
				type="text"
				id="title"
				name="title"
				class="w-full rounded border border-gray-300 p-2"
			/>
		</div>
		<div>
			<label for="date" class="block">Fecha:</label>
			<input
				type="date"
				id="date"
				name="date"
				class="w-full rounded border border-gray-300 p-2"
			/>
		</div>
		<div>
			<label for="start_time" class="block">Hora de inicio:</label>
			<input
				type="time"
				id="start_time"
				name="start_time"
				class="w-full rounded border border-gray-300 p-2"
			/>
		</div>
		<div>
			<label for="end_time" class="block">Hora de finalizacion:</label>
			<input
				type="time"
				id="end_time"
				name="end_time"
				class="w-full rounded border border-gray-300 p-2"
			/>
		</div>
		<div class="col-span-2">
			<label for="description" class="block">Descripcion:</label>
			<textarea
				id="description"
				name="description"
				class="w-full resize-y rounded border border-gray-300 p-2"></textarea>
		</div>
		<div class="col-span-2 flex justify-between">
			<a href="/dashboardteacher" class="mt-2 rounded-md bg-white px-2 py-1 hover:bg-gray-200"
				>Cancelar</a
			>
			<button class="mt-2 rounded-md bg-primary px-4 py-1 text-white opacity-50" disabled="true"
				>Crear</button
			>
		</div>
	</form>
</section>
