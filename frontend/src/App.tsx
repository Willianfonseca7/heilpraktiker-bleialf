import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout.tsx";
import { Home } from "./features/home/Home.tsx";
import { SimplePage } from "./features/pages/SimplePage.tsx";
import { NotFound } from "./features/pages/NotFound.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<SimplePage title="Unser Team" />} />
          <Route path="/kompetenz" element={<SimplePage title="Kompetenz & Wissen" />} />
          <Route path="/aktuelles" element={<SimplePage title="Aktuelles" />} />
          <Route path="/kontakt" element={<SimplePage title="Kontakt" />} />
          <Route path="/disclaimer" element={<SimplePage title="Disclaimer" />} />
          <Route path="/impressum" element={<SimplePage title="Impressum" />} />
          <Route path="/datenschutz" element={<SimplePage title="Datenschutz" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
