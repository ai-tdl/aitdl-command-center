

const BuildLogs = () => {
  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl h-full font-mono text-xs">
      <h2 className="text-xl font-bold mb-4 font-sans">Build Logs</h2>
      <div className="bg-black/40 p-3 rounded-lg overflow-y-auto max-h-[200px] text-green-400">
        <p>[12:00:01] Starting build...</p>
        <p>[12:00:45] Static export success</p>
        <p>[12:01:02] Firebase sync complete</p>
      </div>
    </div>
  );
};

export default BuildLogs;
