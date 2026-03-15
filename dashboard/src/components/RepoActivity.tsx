import { useState, useEffect } from 'react';
import { getGithubActivity } from '../lib/api';

const RepoActivity = () => {
  const [commits, setCommits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGithubActivity();
        setCommits(data.commits);
      } catch (err) {
        console.error("Failed to fetch commits", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-6 bg-premium-card border border-premium-border rounded-2xl animate-pulse">Loading activity...</div>;

  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl h-full">
      <h2 className="text-xl font-bold mb-4">Repo Activity</h2>
      <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
        {commits.map((c: any) => (
          <div key={c.sha} className="flex flex-col space-y-1 pb-3 border-b border-white/5 last:border-0">
            <div className="flex items-center space-x-2">
              <div className="bg-premium-accent w-2 h-2 rounded-full shrink-0"></div>
              <span className="font-mono text-[10px] opacity-70">{c.sha.substring(0, 7)}</span>
            </div>
            <p className="text-sm line-clamp-2">{c.message}</p>
            <div className="flex justify-between items-center text-[10px] opacity-50">
              <span>{c.author}</span>
              <span>{new Date(c.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoActivity;
