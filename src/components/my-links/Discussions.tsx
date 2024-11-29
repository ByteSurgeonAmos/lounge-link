// src/components/my-links/Discussions.tsx

interface DiscussionsProps {
  discussions: number;
  badges: number;
  endorsements: number;
}

const Discussions: React.FC<DiscussionsProps> = ({ discussions, badges, endorsements }) => {
  return (
    <div className="bg-blue-100 rounded-lg p-4 shadow-md max-w-xs">
      <h2 className="text-lg font-bold mb-2">Milestone Activity</h2>
      <ul className="space-y-2 text-sm text-blue-900">
        <li>🎉 You’ve joined {discussions} discussions this week!</li>
        <li>🎉 You’ve unlocked {badges} new badges!</li>
        <li>🎉 You earned {endorsements} new endorsements from your links!</li>
      </ul>
    </div>
  );
};

export default Discussions;