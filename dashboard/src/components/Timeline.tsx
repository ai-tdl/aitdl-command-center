

const Timeline = () => {
  return (
    <div className="p-6 bg-premium-card border border-premium-border rounded-2xl h-full">
      <h2 className="text-xl font-bold mb-4">Activity Timeline</h2>
      <div className="space-y-4">
        <div className="border-l-2 border-premium-accent pl-4 py-1">
          <p className="text-sm font-medium">Production Deploy Success</p>
          <p className="text-xs opacity-50">10 mins ago</p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
