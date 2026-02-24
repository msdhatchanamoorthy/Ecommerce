export default function EmptyState({ icon = '📭', title = 'Nothing here', message = 'Try searching for something else', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
