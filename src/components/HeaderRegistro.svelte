<script>
import Buttons from "./RoleButtons.svelte"

import { ROLE_STATUS, appStatus } from "@/store.ts"
</script>

<header class="flex items-center justify-between pl-11 pr-11 pt-7">
	<img src="../public/img/logo.svg">
	<div class="flex gap-x-6">
		<Buttons />
	</div>
</header>


<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
