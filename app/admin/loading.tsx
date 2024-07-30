export default function Loading() {
  return (
    <div role="status" className="loading-placeholder animate-pulse h-screen bg-gray-100 dark:bg-gray-600 -my-6 -mx-6 p-6">
      <header className="flex justify-between items-center h-16 bg-gray-200 dark:bg-gray-800 shadow px-4 -mx-6 -mt-6 mb-6">
        <div className="h-4 bg-gray-300 dark:bg-gray-900 rounded-full w-48"></div>
      </header>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full my-7 w-14"></div>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div className="p-4 py-6 border border-gray-200 dark:border-gray-800 rounded shadow animate-pulse">
              <div className="h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mb-2.5"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mb-2.5"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
