import { useState, useEffect } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import DeploymentStatus from './components/DeploymentStatus';
import BranchPanel from './components/BranchPanel';
import Timeline from './components/Timeline';
import RepoActivity from './components/RepoActivity';
import HealthMonitor from './components/HealthMonitor';
import BuildLogs from './components/BuildLogs';
import IncidentTracker from './components/IncidentTracker';
import BackupManager from './components/BackupManager';
import DeploymentAnalytics from './components/DeploymentAnalytics';
import ReleaseManager from './components/ReleaseManager';
import { db } from './lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [profile, setProfile] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const token = await u.getIdTokenResult();
        const adminStatus = !!token.claims.admin;
        setIsAdmin(adminStatus);

        // Listen for profile changes
        const unsubscribe = onSnapshot(doc(db, 'users', u.uid), (doc) => {
          if (doc.exists()) setProfile(doc.data());
        });
        return () => unsubscribe();
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="min-h-screen bg-premium-bg flex items-center justify-center">Initializing...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-premium-bg flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-premium-card border border-premium-border rounded-3xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold gradient-text">Command Center Auth</h1>
            <p className="text-xs opacity-50 text-white">Authorized Personnel Only</p>
          </div>
          <div className="space-y-4">
            <input 
              type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-premium-accent"
            />
            <input 
              type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-premium-accent"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-premium-accent rounded-xl font-bold hover:shadow-[0_0_20px_rgba(94,17,255,0.4)] transition-all">
            Unlock Interface
          </button>
          
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-premium-bg px-2 text-white/30">or</span></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <span>🌐</span> Login with Google
          </button>
        </form>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-premium-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md p-12 bg-premium-card border border-premium-border rounded-3xl text-center space-y-6">
          <div className="text-6xl text-premium-accent">🔒</div>
          <h1 className="text-3xl font-extrabold gradient-text">Access Denied</h1>
          <p className="text-white/50 text-sm leading-relaxed">
            This workspace is restricted to authorized operators. Your account does not have the necessary clearance level.
          </p>
          <div className="pt-6">
            <button 
              onClick={() => signOut(auth)}
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all text-sm"
            >
              Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight gradient-text">Command Center</h1>
          <p className="text-white/40 mt-2">AITDL Operational Intelligence Dashboard</p>
        </div>
        <div className="text-right flex items-center gap-6">
          <div>
            <p className="text-xs opacity-50 uppercase">Session Status</p>
            <p className="text-sm font-semibold text-premium-accent">Admin Active</p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="text-xs opacity-30 hover:opacity-100 underline decoration-premium-accent"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile?.dashboardModules?.includes('DeploymentStatus') !== false && <DeploymentStatus />}
            {profile?.dashboardModules?.includes('HealthMonitor') !== false && <HealthMonitor />}
          </div>
          {profile?.dashboardModules?.includes('PerformancePulse') !== false && <DeploymentAnalytics />}
          {profile?.dashboardModules?.includes('IncidentTracker') !== false && <IncidentTracker />}
          <BuildLogs />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <BranchPanel />
          {profile?.dashboardModules?.includes('ReleaseManager') !== false && <ReleaseManager />}
          {profile?.dashboardModules?.includes('BackupManager') !== false && <BackupManager />}
          {profile?.dashboardModules?.includes('Timeline') !== false && <Timeline />}
          {profile?.dashboardModules?.includes('RepoActivity') !== false && <RepoActivity />}
        </div>
      </div>
    </div>
  );
}

export default App;
