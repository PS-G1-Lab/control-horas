import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

import svelte from "@astrojs/svelte"
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), svelte()],
	output: "server",
	adapter: vercel(),
})
