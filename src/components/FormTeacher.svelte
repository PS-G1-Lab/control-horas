<script>
  import Input from "./Input.svelte";
  import Title from "./Title.svelte";
  import DropMenu from "./DropMenu.svelte";
</script>

<img src="../../public/img/teacher-in-class.svg">
<form class="flex flex-col gap-y-9">
  <Title title="Registro profesor" />
  <div class="relative">
    <Input type="text" id="name" content="Nombre:" placeholder=" " />
  </div>
  <div class="relative">
    <Input type="email" id="mail" content="Correo:" placeholder=" " />
  </div>
  <div class="relative">
    <Input type="password" id="passwd" content="Contraseña:" placeholder=" " />
  </div>
  <div class="relative">
    <Input type="password" id="confirmPasswd" content="Confirmar contraseña:" placeholder=" " />
  </div>
  <DropMenu />
  <button
    type="submit"
    class="mx-auto w-56 justify-center rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600"
  >
    Registrarse
  </button>
</form>

<style>
  form {
    max-width: 22rem;
  }
</style>
