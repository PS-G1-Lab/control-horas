<script>
	import RoleButtons from "@/components/RoleButtons.svelte"
	import { ROLE_STATUS, appStatus } from "@/store.ts"
</script>

<div class="w-full lg:w-1/2 flex flex-col items-center">
	<h1 class="text-2xl font-bold mt-3 mb-5">¿Buscas clases particulares?</h1>
	<RoleButtons />
	<div class="text-2xl my-8 text-pretty">
		{#if $appStatus === ROLE_STATUS.STUDENT}
			<p class="mb-5">Encuentra y contacta gratis con profesores particulares.</p>
			<p>Busca a tu profesor según tus necesidades, experiencia y presupuesto.</p>
		{:else}
			<p class="mb-5">Transmite tus conocimientos y gana dinero impartiendo clases particulares.</p>
			<p>Tú pones las reglas; establece tus horarios y tus precios.</p>
		{/if}
	</div>
	<div class="flex flex-row text-xl w-full justify-center items-center gap-20">
		<a
			href="/signup"
			class="text-white bg-primary py-2 px-4 rounded-md flex items-center justify-center gap-3"
			>Comenzar <img
				src="icons/rightArrow.svg"
				alt="Flecha apuntando hacia la derecha"
				class="w-4 h-auto"
			/></a
		>
		<a href="/faqs" aria-label="Enlace que te lleva a la página de preguntas frecuentes"
			><img src="icons/questionMark.svg" alt="Cierre de interrogación" class="w-8 h-auto" /></a
		>
	</div>
</div>
