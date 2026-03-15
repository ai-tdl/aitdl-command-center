import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const DeploymentStatus = () => {
  const [latestDeploy, setLatestDeploy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "deployments"),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setLatestDeploy(snapshot.docs[0].data());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-6 bg-premium-card border border-premium-border rounded-2xl animate-pulse">Checking status...</div>;

  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Deployment Status</h2>
      <div className="flex items-center space-x-4">
        <div className={`w-4 h-4 rounded-full ${
          latestDeploy?.status === 'success' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 
          'bg-yellow-500 animate-pulse'
        }`}></div>
        <div>
          <p className="font-bold flex items-center gap-2">
            {latestDeploy?.branch || 'Unknown'} 
            <span className="text-[10px] opacity-50 font-mono">({latestDeploy?.status || 'checking'})</span>
          </p>
          <p className="text-xs opacity-50">
            Commit: {latestDeploy?.commit?.substring(0, 7) || 'N/A'} • 
            {latestDeploy?.timestamp?.toDate() ? latestDeploy.timestamp.toDate().toLocaleString() : 'Just now'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeploymentStatus;
