import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ChapterPage } from './pages/Chapter';
import { Login } from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/capitulo/introducao" replace />} />
          <Route path="capitulo/:slug" element={<ChapterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
