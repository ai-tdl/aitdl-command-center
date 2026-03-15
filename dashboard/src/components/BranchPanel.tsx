import { useState } from 'react';
import { triggerDeploy, mergeBranch } from '../lib/api';

const BranchPanel = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (type: string, payload: any) => {
    setLoading(type);
    try {
      if (type === 'deploy') {
        await triggerDeploy(payload);
        alert(`Deploy triggered for ${payload}`);
      } else if (type === 'merge') {
        await mergeBranch(payload.from, payload.to);
        alert(`Merged ${payload.from} into ${payload.to}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Branch Management</h2>
      <div className="space-y-4">
        {/* Main Branch Control */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold">main</span>
            <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">v5.0.0</span>
          </div>
          <button 
            onClick={() => handleAction('deploy', 'production')}
            disabled={!!loading}
            className="w-full py-2 bg-premium-accent rounded-lg text-sm font-bold hover:opacity-80 disabled:opacity-30 transition-all"
          >
            {loading === 'deploy' ? 'Deploying...' : 'Deploy to Production'}
          </button>
        </div>

        {/* Development Control */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold">dev</span>
            <span className="text-xs opacity-50">feature/dashboard</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => handleAction('deploy', 'dev')}
              disabled={!!loading}
              className="py-2 bg-white/10 rounded-lg text-[10px] font-bold hover:bg-white/20 disabled:opacity-30"
            >
              Trigger Preview
            </button>
            <button 
              onClick={() => handleAction('merge', { from: 'dev', to: 'beta' })}
              disabled={!!loading}
              className="py-2 bg-premium-accent/20 border border-premium-accent/30 rounded-lg text-[10px] font-bold hover:bg-premium-accent/30 disabled:opacity-30"
            >
              Merge to Beta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchPanel;
