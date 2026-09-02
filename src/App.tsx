import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ChapterPage } from './pages/Chapter';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { TechnicalNotebookPage } from './pages/TechnicalNotebookPage';
import { AuditPanel } from './pages/AuditPanel';
import { TheoryLibraryPage } from './pages/TheoryLibraryPage';
import { TheoryLessonPage } from './pages/TheoryLessonPage';
import { TheoryVideosPage } from './pages/TheoryVideosPage';
import { PricingPage } from './pages/PricingPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { PaymentCanceledPage } from './pages/PaymentCanceledPage';
import { MySubscriptionPage } from './pages/MySubscriptionPage';
import { AdminPaymentsPage } from './pages/AdminPaymentsPage';
import { AdminStudentsPage } from './pages/AdminStudentsPage';
import { PremiumLockModal } from './components/PremiumLockModal';
import { SuccessConversionModal } from './components/SuccessConversionModal';

export default function App() {
  return (
    <BrowserRouter>
      <PremiumLockModal />
      <SuccessConversionModal />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Planos e Checkout */}
        <Route path="/planos" element={<PricingPage />} />
        <Route path="/pagamento/sucesso" element={<PaymentSuccessPage />} />
        <Route path="/pagamento/cancelado" element={<PaymentCanceledPage />} />
        <Route path="/minha-assinatura" element={<MySubscriptionPage />} />
        
        {/* Painel Administrativo de Assinaturas e Auditoria */}
        <Route path="/admin/pagamentos" element={<AdminPaymentsPage />} />
        <Route path="/admin/alunos" element={<AdminStudentsPage />} />
        <Route path="/painel-editorial" element={<AuditPanel />} />
        <Route path="/auditoria" element={<AuditPanel />} />
        
        {/* Formação Teórica Autoral */}
        <Route path="/formacao-teorica" element={<Layout />}>
          <Route index element={<TheoryLibraryPage />} />
          <Route path="galeria-videos" element={<TheoryVideosPage />} />
          <Route path=":trackSlug" element={<TheoryLibraryPage />} />
          <Route path=":trackSlug/:lessonSlug" element={<TheoryLessonPage />} />
        </Route>

        {/* Rotas do Sistema / Curso */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/capitulo/introducao" replace />} />
        </Route>

        <Route path="/caderno-tecnico" element={<Layout />}>
          <Route index element={<TechnicalNotebookPage />} />
        </Route>
        
        <Route path="/capitulo" element={<Layout />}>
          <Route index element={<Navigate to="/capitulo/introducao" replace />} />
          <Route path=":slug" element={<ChapterPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


