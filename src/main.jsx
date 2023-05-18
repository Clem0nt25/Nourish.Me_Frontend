import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SessionContextProvider from "./contexts/SessionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<SessionContextProvider>
				<App />
			</SessionContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
