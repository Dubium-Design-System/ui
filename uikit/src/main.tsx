import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./dev";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
