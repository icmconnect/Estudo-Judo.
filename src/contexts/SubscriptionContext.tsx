import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { UserSubscription, SubscriptionStatus } from '../types';
import { isContentFreePreview } from '../data/plansData';

interface SubscriptionContextType {
  subscription: UserSubscription | null;
  loading: boolean;
  isFree: boolean;
  isPending: boolean;
  isActive: boolean;
  isBlocked: boolean;
  accessAllowed: boolean;
  isAdmin: boolean;
  showSuccessConversionModal: boolean;
  dismissSuccessConversionModal: () => void;
  createCheckoutSession: () => Promise<{ url?: string; sessionId?: string; mockMode?: boolean; error?: string }>;
  refreshSubscription: () => Promise<void>;
  checkCanAccessContent: (type: 'chapter' | 'lesson' | 'theory' | 'technique' | 'glossary', slugOrId: string) => boolean;
  isLockModalOpen: boolean;
  openLockModal: (contextTitle?: string) => void;
  openPaywallModal: (contextTitle?: string) => void;
  closeLockModal: () => void;
  lockModalContextTitle: string;
}

const DEFAULT_FREE_SUBSCRIPTION = (uid: string): UserSubscription => ({
  uid,
  planId: 'free',
  provider: 'none',
  status: 'free',
  amountInCents: 0,
  currency: 'BRL',
  accessAllowed: false,
  sourceOfTruth: 'admin_manual',
  startedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

const CONVERSION_SHOWN_KEY_PREFIX = 'dojo_conversion_acknowledged_';

const SubscriptionContext = createContext<SubscriptionContextType>({} as SubscriptionContextType);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSuccessConversionModal, setShowSuccessConversionModal] = useState<boolean>(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState<boolean>(false);
  const [lockModalContextTitle, setLockModalContextTitle] = useState<string>('');

  // Sincronizar assinatura do usuário em tempo real
  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const subDocRef = doc(db, 'subscriptions', user.uid);

    // 1. Tentar Firestore onSnapshot
    const unsubscribe = onSnapshot(
      subDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as UserSubscription;
          setSubscription(data);

          // Verificar se houve conversão recém-confirmada para exibir aviso de sucesso único
          if (data.accessAllowed && data.status === 'active') {
            const hasAcknowledged = localStorage.getItem(`${CONVERSION_SHOWN_KEY_PREFIX}${user.uid}`);
            if (!hasAcknowledged) {
              setShowSuccessConversionModal(true);
            }
          }
        } else {
          // Se o documento ainda não existe, consultar endpoint do servidor ou criar perfil free padrão
          fetchServerStatus(user.uid);
        }
        setLoading(false);
      },
      (error) => {
        console.warn('Firestore onSnapshot de subscription indisponível ou offline. Usando fallback server-side:', error);
        fetchServerStatus(user.uid);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const fetchServerStatus = async (uid: string) => {
    try {
      const res = await fetch(`/api/stripe/subscription-status?uid=${encodeURIComponent(uid)}`);
      if (res.ok) {
        const data = await res.json();
        setSubscription(data);
      } else {
        const defaultSub = DEFAULT_FREE_SUBSCRIPTION(uid);
        setSubscription(defaultSub);
      }
    } catch (err) {
      console.warn('Falha ao obter status do servidor, usando free tier default:', err);
      const defaultSub = DEFAULT_FREE_SUBSCRIPTION(uid);
      setSubscription(defaultSub);
    } finally {
      setLoading(false);
    }
  };

  const refreshSubscription = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    await fetchServerStatus(user.uid);
  }, [user]);

  // Criar sessão de checkout no backend seguro
  const createCheckoutSession = useCallback(async (): Promise<{
    url?: string;
    sessionId?: string;
    mockMode?: boolean;
    error?: string;
  }> => {
    if (!user) {
      return { error: 'Você precisa estar logado para iniciar o pagamento.' };
    }

    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          planId: 'dojo_founder_97',
          uid: user.uid,
          userEmail: user.email
        })
      });

      const data = await res.json();
      if (!res.ok) {
        return { error: data.error || 'Erro ao comunicar com o servidor de pagamento.' };
      }

      if (data.url) {
        // Redirecionamento seguro para o Stripe Checkout
        window.location.href = data.url;
        return { url: data.url, sessionId: data.sessionId };
      }

      if (data.mockMode && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return { mockMode: true, url: data.checkoutUrl };
      }

      return { error: 'Não foi possível gerar a URL de pagamento.' };
    } catch (err: any) {
      console.error('Erro na requisição de checkout:', err);
      return { error: err.message || 'Erro de conexão com o servidor.' };
    }
  }, [user]);

  const dismissSuccessConversionModal = useCallback(() => {
    if (user) {
      localStorage.setItem(`${CONVERSION_SHOWN_KEY_PREFIX}${user.uid}`, 'true');
    }
    setShowSuccessConversionModal(false);
  }, [user]);

  const openLockModal = useCallback((contextTitle?: string) => {
    setLockModalContextTitle(contextTitle || 'Conteúdo do Plano Fundador');
    setIsLockModalOpen(true);
  }, []);

  const closeLockModal = useCallback(() => {
    setIsLockModalOpen(false);
  }, []);

  // Regra de validação de acesso
  const isAdminEmail = user?.email === 'gustavomacedo.consultor@gmail.com';

  const accessAllowed = Boolean((subscription?.accessAllowed && subscription?.status !== 'blocked') || isAdminEmail);
  const isBlocked = subscription?.status === 'blocked' && !isAdminEmail;
  const isPending = subscription?.status === 'pending_payment' && !isAdminEmail;
  const isActive = Boolean(
    ((subscription?.status === 'active' || subscription?.status === 'manual_grant') && accessAllowed) || isAdminEmail
  );
  const isFree = !accessAllowed && !isBlocked && !isPending;
  const isAdmin = Boolean(
    user && (
      user.email?.includes('admin') ||
      isAdminEmail ||
      (user as { role?: string })?.role === 'admin' ||
      subscription?.sourceOfTruth === 'admin_manual'
    )
  );

  const checkCanAccessContent = useCallback(
    (type: 'chapter' | 'lesson' | 'theory' | 'technique' | 'glossary', slugOrId: string): boolean => {
      // Se tiver acesso liberado e não estiver bloqueado, libera tudo
      if (accessAllowed) return true;
      // Caso contrário, valida se é conteúdo de demonstração do plano gratuito
      return isContentFreePreview(type, slugOrId);
    },
    [accessAllowed]
  );

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,
        isFree,
        isPending,
        isActive,
        isBlocked,
        accessAllowed,
        isAdmin,
        showSuccessConversionModal,
        dismissSuccessConversionModal,
        createCheckoutSession,
        refreshSubscription,
        checkCanAccessContent,
        isLockModalOpen,
        openLockModal,
        openPaywallModal: openLockModal,
        closeLockModal,
        lockModalContextTitle
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
