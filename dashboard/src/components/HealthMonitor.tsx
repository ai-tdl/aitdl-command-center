import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, collection, query, getDocs } from 'firebase/firestore';

const HealthMonitor = () => {
  const [health, setHealth] = useState<any>(null);
  const [stats, setStats] = useState({ success: 0, total: 0 });

  useEffect(() => {
    // 1. Listen to real-time site health (from Cron job)
    const unsub = onSnapshot(doc(db, "metrics", "latest"), (snap) => {
      setHealth(snap.data());
    });

    // 2. Fetch deployment stats
    async function fetchStats() {
      const q = query(collection(db, "deployments"));
      const snap = await getDocs(q);
      const total = snap.size;
      const success = snap.docs.filter(d => d.data().status === 'success').length;
      setStats({ success, total });
    }
    fetchStats();

    return () => unsub();
  }, []);

  const successRate = stats.total > 0 ? Math.round((stats.success / stats.total) * 100) : 100;

  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Operational Health</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <p className="text-[10px] opacity-50 uppercase tracking-tighter">Site Status</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${
              health?.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'
            }`}></div>
            <p className="text-lg font-bold capitalize">{health?.status || '...'}</p>
          </div>
          <p className="text-[10px] opacity-40 mt-1">{health?.responseTime}ms latency</p>
        </div>

        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <p className="text-[10px] opacity-50 uppercase tracking-tighter">Deploy Success Rate</p>
          <p className="text-lg font-bold mt-1 text-premium-accent">{successRate}%</p>
          <p className="text-[10px] opacity-40 mt-1">{stats.success} / {stats.total} total</p>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitor;
