

const BranchPanel = () => {
  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Branch Management</h2>
      <div className="space-y-2">
        <div className="flex justify-between p-3 bg-white/5 rounded-lg">
          <span>main</span>
          <span className="text-sm opacity-50">v5.0.0</span>
        </div>
        <div className="flex justify-between p-3 bg-white/5 rounded-lg">
          <span>beta</span>
          <span className="text-sm opacity-50">v5.0.1-rc</span>
        </div>
      </div>
    </div>
  );
};

export default BranchPanel;
