import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'wf_install_dismissed';

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) === '1') return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setVisible(false));

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === 'accepted') setVisible(false);
    setDeferred(null);
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

  return (
    <div
      role="dialog"
      aria-label="Install Wells Fargo as an app"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        right: '16px',
        maxWidth: '420px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        border: '1px solid #e2dede',
        padding: '16px 18px',
        zIndex: 9999,
        fontFamily: f,
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: '44px',
          height: '44px',
          backgroundColor: '#D71E28',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1rem',
        }}
      >
        WF
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.94rem', fontWeight: 600, color: '#141414' }}>
          Install Wells Fargo
        </div>
        <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '2px' }}>
          Add a shortcut for faster access.
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <button
          type="button"
          onClick={handleInstall}
          style={{
            backgroundColor: '#D71E28',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            fontWeight: 600,
            fontSize: '0.82rem',
            padding: '6px 18px',
            cursor: 'pointer',
            fontFamily: f,
          }}
        >
          Install
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          style={{
            backgroundColor: 'transparent',
            color: '#555',
            border: 'none',
            fontSize: '0.76rem',
            padding: '2px',
            cursor: 'pointer',
            fontFamily: f,
          }}
        >
          Not now
        </button>
      </div>
    </div>
  );
}
