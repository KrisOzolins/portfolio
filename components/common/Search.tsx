import { useEffect } from 'react';
import Icon from './Icon';

function Search({ showSearch, setShowSearch }: { showSearch: boolean; setShowSearch: (show: boolean) => void }) {
  useEffect(() => {
    const closeSearch = (e: KeyboardEvent | MouseEvent) => {
      if (
        (e instanceof KeyboardEvent && e.key === 'Escape') ||
        (e instanceof MouseEvent && e.target instanceof HTMLElement && !e.target.closest('.search-dialog'))
      ) {
        setShowSearch(false);
      }
    };

    window.addEventListener('keydown', closeSearch);
    window.addEventListener('click', closeSearch);

    return () => {
      window.removeEventListener('keydown', closeSearch);
      window.removeEventListener('click', closeSearch);
    };
  }, []);

  return (
    showSearch && (
      <div className="relative z-max" id="headlessui-dialog-:r4l:" role="dialog" aria-modal="true" data-headlessui-state="open">
        <div className="fixed inset-0 bg-gray-dark/25 backdrop-blur transition-opacity opacity-100">
          <div className="flex justify-center px-3 pb-4 pt-20 sm:pt-28">
            <div className="search-dialog w-full max-w-xl overflow-hidden rounded-2xl text-left align-middle bg-white dark:bg-neutral-800">
              <form role="search" method="GET" className="search-d relative" action="https://ncmaz.chisnghiax.com">
                <div className="relative">
                  <Icon name="search" className="absolute mt-[1px] left-3 top-1/2 transform -translate-y-1/2 text-2xl opacity-70" />
                  <input
                    type="search"
                    className="font-header block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl  text-sm font-normal px-4 py-5 pl-12 shadow-none !ring-0 !border-0 dark:bg-neutral-700"
                    name="s"
                    placeholder="Type and press enter"
                  />
                  <input type="submit" hidden value="" />
                </div>
              </form>
              <div className="results">
                <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700">
                  <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 py-3 px-4">Recent searches</div>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary-500 dark:text-primary-400 py-3 px-4 hover:text-primary-600 dark:hover:text-primary-500"
                  >
                    Clear
                  </button>
                </div>
                <div className="py-3 px-4">
                  <a href="#" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-primary-500 dark:hover:text-primary-400">
                    Next.js
                  </a>
                  <a href="#" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-primary-500 dark:hover:text-primary-400">
                    Tailwind CSS
                  </a>
                  <a href="#" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-primary-500 dark:hover:text-primary-400">
                    React
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Search;
