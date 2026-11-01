import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#17212b", ocean: "#163b52", sun: "#f6c453", mist: "#f3f5f7" }, boxShadow: { soft: "0 8px 30px rgba(23,33,43,.07)" } } },
  plugins: []
};
export default config;