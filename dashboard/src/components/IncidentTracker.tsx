import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const IncidentTracker = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "logs"),
      orderBy("timestamp", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLogs(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-6 bg-premium-card border border-premium-border rounded-2xl animate-pulse">Scanning for incidents...</div>;

  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Incident Tracker</h2>
        <span className={`text-[10px] px-2 py-1 rounded-md font-bold ${
          logs.length === 0 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
        }`}>
          {logs.length} RECORDED EVENTS
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {logs.length === 0 ? (
          <div className="text-center py-12 opacity-30 italic text-sm">
            System pulse nominal. No incidents reported.
          </div>
        ) : (
          logs.map((log: any) => (
            <div key={log.id} className={`p-3 rounded-xl border ${
              log.severity === 'error' || log.type === 'rollback' 
                ? 'bg-red-500/5 border-red-500/10' 
                : 'bg-white/5 border-white/5'
            }`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  log.type === 'rollback' ? 'text-red-500' : 'text-premium-accent'
                }`}>{log.type}</span>
                <span className="text-[10px] opacity-40">
                  {log.timestamp?.toDate() ? log.timestamp.toDate().toLocaleTimeString() : 'Just now'}
                </span>
              </div>
              <p className="text-sm font-medium leading-tight">{log.message || `Event: ${log.type}`}</p>
              {log.metadata && Object.keys(log.metadata).length > 0 && (
                <div className="mt-2 p-2 bg-black/20 rounded-lg text-[10px] font-mono opacity-60 break-all">
                  {JSON.stringify(log.metadata)}
                </div>
              )}
              {log.fromSha && (
                <div className="mt-2 flex items-center gap-2 text-[10px] font-mono">
                  <span className="opacity-40">Rollback:</span>
                  <span className="bg-red-500/10 text-red-500 px-1 rounded">{log.fromSha.substring(0,7)}</span>
                  <span className="opacity-40">→</span>
                  <span className="bg-green-500/10 text-green-500 px-1 rounded">{log.toSha.substring(0,7)}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IncidentTracker;
