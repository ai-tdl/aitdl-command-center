import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Package, ChevronRight, History } from 'lucide-react';

const ReleaseManager = () => {
  const [releases, setReleases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "deployments"),
      where("branch", "==", "main"),
      where("status", "==", "success"),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReleases(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl animate-pulse min-h-[200px] flex items-center justify-center font-bold tracking-widest uppercase text-[10px] opacity-50">
      Loading release history...
    </div>
  );

  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Package className="w-5 h-5 text-premium-accent" />
          Release Manager
        </h2>
        <History className="w-4 h-4 opacity-20" />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {releases.length === 0 ? (
          <div className="text-center py-12 opacity-30 italic text-sm">
            No production releases recorded yet.
          </div>
        ) : (
          releases.map((release, index) => (
            <div key={release.id} className="group p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-default">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded leading-none ${
                        index === 0 ? 'bg-premium-accent text-white' : 'bg-white/10 opacity-60'
                    }`}>
                      {index === 0 ? 'CURRENT' : `v-1.${releases.length - index}`}
                    </span>
                    <span className="text-xs font-mono opacity-80">{release.commit?.substring(0, 7)}</span>
                  </div>
                  <p className="text-[10px] opacity-40 mt-1">
                    {release.timestamp?.toDate() ? release.timestamp.toDate().toLocaleString() : 'Recent'}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 text-[10px] opacity-30 flex justify-between">
        <span>Displaying last 10 production builds</span>
        <button className="hover:text-premium-accent underline">View Registry</button>
      </div>
    </div>
  );
};

export default ReleaseManager;
