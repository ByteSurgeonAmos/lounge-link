const Spinner = ({ color }: { color: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full h-6 w-6 border-b-2 border-${color}`}
      ></div>
    </div>
  );
};

export default Spinner;
