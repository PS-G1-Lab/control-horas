<script>
  import Name from "@/components/Name.svelte";
  import Azul from "@/components/Azul.svelte";
  import NColor from "@/components/NColor.svelte";

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
