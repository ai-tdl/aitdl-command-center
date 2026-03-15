import { useState, useEffect } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import DeploymentStatus from './components/DeploymentStatus';
import BranchPanel from './components/BranchPanel';
import Timeline from './components/Timeline';
import RepoActivity from './components/RepoActivity';
import HealthMonitor from './components/HealthMonitor';
import BuildLogs from './components/BuildLogs';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
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
          <button className="w-full py-3 bg-premium-accent rounded-xl font-bold hover:shadow-[0_0_20px_rgba(94,17,255,0.4)] transition-all">
            Unlock Interface
          </button>
        </form>
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
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DeploymentStatus />
          <HealthMonitor />
          <div className="md:col-span-2">
            <BuildLogs />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <BranchPanel />
          <Timeline />
          <RepoActivity />
        </div>
      </div>
    </div>
  );
}

export default App;
