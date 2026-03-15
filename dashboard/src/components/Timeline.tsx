import { useState, useEffect } from 'react';
import { getGithubActivity } from '../lib/api';

const Timeline = () => {
  const [runs, setRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGithubActivity();
        setRuns(data.runs);
      } catch (err) {
        console.error("Failed to fetch workflow runs", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-6 bg-premium-card border border-premium-border rounded-2xl animate-pulse">Loading timeline...</div>;

  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl h-full">
      <h2 className="text-xl font-bold mb-4">Workflow Timeline</h2>
      <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {runs.map((run: any) => (
          <div key={run.id} className={`border-l-2 pl-4 py-1 ${
            run.conclusion === "success" ? "border-green-500" :
            run.conclusion === "failure" ? "border-red-500" : "border-premium-accent animate-pulse"
          }`}>
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium">{run.name}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                run.conclusion === "success" ? "bg-green-500/10 text-green-500" :
                run.conclusion === "failure" ? "bg-red-500/10 text-red-500" : "bg-white/10"
              }`}>{run.branch}</span>
            </div>
            <p className="text-xs opacity-50">{new Date(run.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
