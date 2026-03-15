import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { triggerManualBackup } from '../lib/api';

const BackupManager = () => {
  const [lastBackup, setLastBackup] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Listen for the latest backup_complete log
    const q = query(
      collection(db, "logs"),
      where("type", "==", "backup_complete"),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setLastBackup(snapshot.docs[0].data());
      }
      setFetching(false);
    });

    return () => unsubscribe();
  }, []);

  const handleManualBackup = async () => {
    setLoading(true);
    try {
      const result = await triggerManualBackup();
      alert(`Backup successful: ${result.fileName}`);
    } catch (err: any) {
      alert(`Backup failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-6 bg-premium-card border border-premium-border rounded-2xl animate-pulse">Checking backup status...</div>;

  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Data Safety</h2>
      <div className="space-y-4">
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[10px] opacity-50 uppercase tracking-tighter">Last Backup</p>
              <p className="text-sm font-bold">
                {lastBackup ? new Date(lastBackup.timestamp.toDate()).toLocaleString() : "No backups found"}
              </p>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              lastBackup ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
            }`}>
              {lastBackup ? "SECURE" : "UNPROTECTED"}
            </span>
          </div>
          {lastBackup && (
            <p className="text-[10px] opacity-40 font-mono truncate">
              {lastBackup.metadata.fileName}
            </p>
          )}
        </div>

        <button 
          onClick={handleManualBackup}
          disabled={loading}
          className="w-full py-2 bg-white/10 border border-white/5 rounded-lg text-sm font-bold hover:bg-white/20 transition-all disabled:opacity-30"
        >
          {loading ? "Backing up..." : "Trigger Manual Backup"}
        </button>
      </div>
    </div>
  );
};

export default BackupManager;
