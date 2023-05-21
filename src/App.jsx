import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import DailyDiary from "./pages/DailyDiary";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import ProgressQues from "./pages/ProgressQues";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/daily-diary"
					element={
						<PrivateRoute>
							<DailyDiary />
						</PrivateRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path="/progress-questionnaire"
					element={
						<PrivateRoute>
							<ProgressQues />
						</PrivateRoute>
					}
				/>

				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</>
	);
}

export default App;
