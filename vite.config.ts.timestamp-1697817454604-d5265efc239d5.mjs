// vite.config.ts
import { loadEnv, defineConfig } from "file:///C:/Users/asicr/Dropbox/PC/Desktop/Work/trans-rx/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: {
      rollupOptions: {
        input: {
          form: "src/form.ts",
          search: "src/search.ts",
          formTest: "src/formTest.ts"
          // Add more entry points as needed
        },
        output: {
          entryFileNames: "[name].js"
          // Use [name] placeholder for the same name as input
        }
      }
    },
    define: {
      "process.env.USERNAME": JSON.stringify(env.USERNAME),
      "process.env.PASSWORD": JSON.stringify(env.PASSWORD)
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhc2ljclxcXFxEcm9wYm94XFxcXFBDXFxcXERlc2t0b3BcXFxcV29ya1xcXFx0cmFucy1yeFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYXNpY3JcXFxcRHJvcGJveFxcXFxQQ1xcXFxEZXNrdG9wXFxcXFdvcmtcXFxcdHJhbnMtcnhcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FzaWNyL0Ryb3Bib3gvUEMvRGVza3RvcC9Xb3JrL3RyYW5zLXJ4L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgbG9hZEVudiwgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcblx0Y29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJ1aWxkOiB7XHJcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcclxuXHRcdFx0XHRpbnB1dDoge1xyXG5cdFx0XHRcdFx0Zm9ybTogJ3NyYy9mb3JtLnRzJyxcclxuXHRcdFx0XHRcdHNlYXJjaDogJ3NyYy9zZWFyY2gudHMnLFxyXG5cdFx0XHRcdFx0Zm9ybVRlc3Q6ICdzcmMvZm9ybVRlc3QudHMnLFxyXG5cdFx0XHRcdFx0Ly8gQWRkIG1vcmUgZW50cnkgcG9pbnRzIGFzIG5lZWRlZFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0b3V0cHV0OiB7XHJcblx0XHRcdFx0XHRlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsIC8vIFVzZSBbbmFtZV0gcGxhY2Vob2xkZXIgZm9yIHRoZSBzYW1lIG5hbWUgYXMgaW5wdXRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdGRlZmluZToge1xyXG5cdFx0XHQncHJvY2Vzcy5lbnYuVVNFUk5BTUUnOiBKU09OLnN0cmluZ2lmeShlbnYuVVNFUk5BTUUpLFxyXG5cdFx0XHQncHJvY2Vzcy5lbnYuUEFTU1dPUkQnOiBKU09OLnN0cmluZ2lmeShlbnYuUEFTU1dPUkQpLFxyXG5cdFx0fSxcclxuXHR9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVSxTQUFTLFNBQVMsb0JBQW9CO0FBRXJYLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDbEQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFNBQU87QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNOLGVBQWU7QUFBQSxRQUNkLE9BQU87QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFVBQVU7QUFBQTtBQUFBLFFBRVg7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNQLGdCQUFnQjtBQUFBO0FBQUEsUUFDakI7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ1Asd0JBQXdCLEtBQUssVUFBVSxJQUFJLFFBQVE7QUFBQSxNQUNuRCx3QkFBd0IsS0FBSyxVQUFVLElBQUksUUFBUTtBQUFBLElBQ3BEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
