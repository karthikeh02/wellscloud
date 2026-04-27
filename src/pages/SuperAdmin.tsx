import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCachedAdminRole, clearAdminSession, verifyAdminSession } from '../lib/adminAuth';
import { AdminLoginScreen, AdminLookupScreen } from './Admin';

export default function SuperAdmin() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(() => getCachedAdminRole() === 'superadmin');

  useEffect(() => {
    if (!authed) return;
    verifyAdminSession().then((role) => {
      if (role !== 'superadmin') setAuthed(false);
    });
  }, [authed]);

  if (!authed) {
    return (
      <AdminLoginScreen
        title="Super Admin Login"
        role="superadmin"
        onSuccess={() => setAuthed(true)}
        onBack={() => navigate('/')}
      />
    );
  }

  return (
    <AdminLookupScreen
      title="Super Admin Dashboard"
      showExtras={true}
      onLogout={() => { clearAdminSession(); setAuthed(false); }}
      onHome={() => navigate('/')}
    />
  );
}
