const DashboardCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: any;
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      </div>
    </div>
  );
};
