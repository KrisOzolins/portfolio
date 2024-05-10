import { useEffect, useState, useRef } from 'react';

// Update hash based on current section scrolled into view.
const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef(null);
  const detailsObserverRef = useRef(null);

  const sectionIdsWithoutDetails = sectionIds.filter((sectionId) => sectionId !== 'details');
  const sectionElements = sectionIdsWithoutDetails.map((sectionId) => document.getElementById(sectionId));
  const detailsElement = document.getElementById('details');

  useEffect(() => {
    if (sectionElements.some((sectionElement) => !sectionElement) || sectionElements.length !== sectionIdsWithoutDetails.length || !detailsElement) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // console.log(entries);
        entries.forEach((entry) => {
          // console.log(entry.target.id, entry.isIntersecting, entry.intersectionRatio);
          if (entry.isIntersecting) {
            window.history.replaceState(null, '', `#${entry.target.id}`);
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.5 },
    );

    detailsObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.history.replaceState(null, '', `#${entry.target.id}`);
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.25 },
    );

    sectionElements.forEach((sectionElement) => {
      observerRef.current.observe(sectionElement);
    });

    detailsObserverRef.current.observe(detailsElement);

    // Setup MutationObserver to handle dynamic changes in the sections.
    const config = { childList: true };
    const mutationObserver = new MutationObserver(() => {
      // Re-observe sections if changes occur.
      sectionElements.forEach((sectionElement) => {
        observerRef.current.unobserve(sectionElement);
        observerRef.current.observe(sectionElement);
      });

      observerRef.current.unobserve(detailsElement);
      observerRef.current.observe(detailsElement);
    });

    sectionElements.forEach((sectionElement) => {
      mutationObserver.observe(sectionElement, config);
    });

    mutationObserver.observe(detailsElement, config);

    return () => {
      sectionElements.forEach((sectionElement) => {
        observerRef.current.unobserve(sectionElement);
      });
      observerRef.current.disconnect();

      detailsObserverRef.current.unobserve(detailsElement);
      detailsObserverRef.current.disconnect();

      mutationObserver.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;
