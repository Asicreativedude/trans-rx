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
          formTest: "src/formTest.ts",
          webpap: "src/webpap.ts"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhc2ljclxcXFxEcm9wYm94XFxcXFBDXFxcXERlc2t0b3BcXFxcV29ya1xcXFx0cmFucy1yeFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYXNpY3JcXFxcRHJvcGJveFxcXFxQQ1xcXFxEZXNrdG9wXFxcXFdvcmtcXFxcdHJhbnMtcnhcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FzaWNyL0Ryb3Bib3gvUEMvRGVza3RvcC9Xb3JrL3RyYW5zLXJ4L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgbG9hZEVudiwgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcblx0Y29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XHJcblx0cmV0dXJuIHtcclxuXHRcdGJ1aWxkOiB7XHJcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcclxuXHRcdFx0XHRpbnB1dDoge1xyXG5cdFx0XHRcdFx0Zm9ybTogJ3NyYy9mb3JtLnRzJyxcclxuXHRcdFx0XHRcdHNlYXJjaDogJ3NyYy9zZWFyY2gudHMnLFxyXG5cdFx0XHRcdFx0Zm9ybVRlc3Q6ICdzcmMvZm9ybVRlc3QudHMnLFxyXG5cdFx0XHRcdFx0d2VicGFwOiAnc3JjL3dlYnBhcC50cycsXHJcblx0XHRcdFx0XHQvLyBBZGQgbW9yZSBlbnRyeSBwb2ludHMgYXMgbmVlZGVkXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRvdXRwdXQ6IHtcclxuXHRcdFx0XHRcdGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJywgLy8gVXNlIFtuYW1lXSBwbGFjZWhvbGRlciBmb3IgdGhlIHNhbWUgbmFtZSBhcyBpbnB1dFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0ZGVmaW5lOiB7XHJcblx0XHRcdCdwcm9jZXNzLmVudi5VU0VSTkFNRSc6IEpTT04uc3RyaW5naWZ5KGVudi5VU0VSTkFNRSksXHJcblx0XHRcdCdwcm9jZXNzLmVudi5QQVNTV09SRCc6IEpTT04uc3RyaW5naWZ5KGVudi5QQVNTV09SRCksXHJcblx0XHR9LFxyXG5cdH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStVLFNBQVMsU0FBUyxvQkFBb0I7QUFFclgsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUNsRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsU0FBTztBQUFBLElBQ04sT0FBTztBQUFBLE1BQ04sZUFBZTtBQUFBLFFBQ2QsT0FBTztBQUFBLFVBQ04sTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsVUFBVTtBQUFBLFVBQ1YsUUFBUTtBQUFBO0FBQUEsUUFFVDtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ1AsZ0JBQWdCO0FBQUE7QUFBQSxRQUNqQjtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDUCx3QkFBd0IsS0FBSyxVQUFVLElBQUksUUFBUTtBQUFBLE1BQ25ELHdCQUF3QixLQUFLLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDcEQ7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
