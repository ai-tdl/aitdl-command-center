

const HealthMonitor = () => {
  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Site Health</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-white/5 rounded-xl text-center">
          <p className="text-xs opacity-50 uppercase tracking-wider">Uptime</p>
          <p className="text-lg font-bold">99.9%</p>
        </div>
        <div className="p-3 bg-white/5 rounded-xl text-center">
          <p className="text-xs opacity-50 uppercase tracking-wider">Latency</p>
          <p className="text-lg font-bold">120ms</p>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitor;
