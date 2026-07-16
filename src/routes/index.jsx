import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound";
import BrutalDetail from "@/pages/Detail/BrutalDetail";

export default function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<MainLayout>
						<Home />
					</MainLayout>
				}
			/>
			<Route
				path="/:slug"
				element={
					<MainLayout>
						<BrutalDetail />
					</MainLayout>
				}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
