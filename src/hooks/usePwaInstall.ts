import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const DISMISS_KEY = 'dojo_digital_pwa_dismissed_until';
const DISMISS_DAYS = 7;

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [showIosModal, setShowIosModal] = useState<boolean>(false);

  // Checar modo standalone & sistema operacional
  useEffect(() => {
    // 1. Checar se já está rodando como PWA standalone
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    setIsStandalone(isStandaloneMode);

    // 2. Checar iOS (Safari não tem beforeinstallprompt)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIos(isIosDevice);

    // 3. Checar se foi dispensado nos últimos 7 dias
    const dismissedUntil = localStorage.getItem(DISMISS_KEY);
    if (dismissedUntil) {
      const dismissTime = parseInt(dismissedUntil, 10);
      if (Date.now() < dismissTime) {
        setIsDismissed(true);
      } else {
        localStorage.removeItem(DISMISS_KEY);
      }
    }

    // 4. Ouvinte de beforeinstallprompt (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // 5. Ouvinte de appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Ação de disparar instalação
  const triggerInstall = useCallback(async () => {
    if (isStandalone) return;

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
          setDeferredPrompt(null);
        } else {
          // Se o usuário cancelou o prompt nativo, salvar dispensa por 7 dias
          const expiry = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
          localStorage.setItem(DISMISS_KEY, expiry.toString());
          setIsDismissed(true);
        }
      } catch (err) {
        console.error('Erro ao acionar prompt de instalação PWA:', err);
      }
    } else if (isIos) {
      // No iOS Safari, abrir modal explicativo
      setShowIosModal(true);
    }
  }, [deferredPrompt, isStandalone, isIos]);

  // Ação de dispensar
  const dismissPrompt = useCallback(() => {
    const expiry = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(DISMISS_KEY, expiry.toString());
    setIsDismissed(true);
    setShowIosModal(false);
  }, []);

  // Pode exibir botão se: não está em standalone, não está marcado como instalado recentemente, e ou temos prompt ou é iOS
  const canInstall = !isStandalone && !isInstalled && (Boolean(deferredPrompt) || isIos);

  return {
    canInstall,
    isStandalone,
    isIos,
    isDismissed,
    isInstalled,
    showIosModal,
    setShowIosModal,
    triggerInstall,
    dismissPrompt
  };
}
