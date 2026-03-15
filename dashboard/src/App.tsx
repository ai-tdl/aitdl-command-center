
import DeploymentStatus from './components/DeploymentStatus';
import BranchPanel from './components/BranchPanel';
import Timeline from './components/Timeline';
import RepoActivity from './components/RepoActivity';
import HealthMonitor from './components/HealthMonitor';
import BuildLogs from './components/BuildLogs';

function App() {
  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight highlight-text gradient-text">Command Center</h1>
          <p className="text-white/40 mt-2">AITDL Operational Intelligence Dashboard</p>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-50 uppercase">Session Status</p>
          <p className="text-sm font-semibold text-premium-accent">Admin Active</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DeploymentStatus />
          <HealthMonitor />
          <div className="md:col-span-2">
            <BuildLogs />
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <BranchPanel />
          <Timeline />
          <RepoActivity />
        </div>
      </div>
    </div>
  );
}

export default App;
