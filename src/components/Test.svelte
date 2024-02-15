<script>
	import Name from "./Name.svelte";
	import Azul from "./Azul.svelte";
	import NColor from "./NColor.svelte";

	const condition = true;
</script>

<h1>Hola <Name />!</h1>

<p>JEJEJJEJE en rojo</p>
{#if condition}
	<Azul />
{/if}
<NColor />

<style>
	p {
		color: red;
	}
</style>
