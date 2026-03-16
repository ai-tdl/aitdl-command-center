import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Zap, ShieldCheck } from 'lucide-react';

const DeploymentAnalytics = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "metrics/history/entries"),
      orderBy("timestamp", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => {
        const item = doc.data();
        return {
          time: item.timestamp?.toDate() ? new Date(item.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...',
          latency: item.responseTime || 0,
          status: item.status
        };
      }).reverse();
      setData(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-6 bg-premium-card border border-premium-border rounded-2xl animate-pulse">Initializing analytics...</div>;

  const avgLatency = data.length > 0 ? Math.round(data.reduce((acc, curr) => acc + curr.latency, 0) / data.length) : 0;

  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-premium-accent" />
            Performance Pulse
          </h2>
          <p className="text-[10px] opacity-40 uppercase tracking-widest mt-1">Real-time latency monitoring (ms)</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] opacity-40 uppercase">Avg Latency</p>
            <p className="text-lg font-bold text-premium-accent">{avgLatency}ms</p>
          </div>
          <div className="bg-premium-accent/10 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-premium-accent" />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[200px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5E11FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#5E11FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.3)" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              unit="ms"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0A0A0B', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#5E11FF' }}
            />
            <Area 
              type="monotone" 
              dataKey="latency" 
              stroke="#5E11FF" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorLatency)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] opacity-40 border-t border-white/5 pt-4">
        <ShieldCheck className="w-3 h-3" />
        <span>System is currently healthy across all nodes.</span>
      </div>
    </div>
  );
};

export default DeploymentAnalytics;
