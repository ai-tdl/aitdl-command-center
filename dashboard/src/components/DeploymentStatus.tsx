

const DeploymentStatus = () => {
  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Deployment Status</h2>
      <div className="flex items-center space-x-4">
        <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
        <span>Production: Stable</span>
      </div>
    </div>
  );
};

export default DeploymentStatus;
