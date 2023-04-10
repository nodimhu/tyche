import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";

import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [basicSsl(), sveltekit()],
});
