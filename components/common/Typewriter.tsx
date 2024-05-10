import React, { useState, useEffect } from 'react';

import styles from '@/styles/components/common/Typewriter.module.scss';

const Typewriter = ({ strings, typingSpeed = 90, deletingSpeed = 30 }: { strings: string[]; typingSpeed?: number; deletingSpeed?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      if (displayedText.length > 0) {
        setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % strings.length);
      }
    } else {
      if (displayedText.length < strings[currentIndex].length) {
        setTimeout(() => {
          setDisplayedText(strings[currentIndex].substr(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        setTimeout(() => setIsDeleting(true), 1000); // Wait a bit before starting to delete.
      }
    }
  }, [displayedText, isDeleting, currentIndex]);

  return (
    <div className={styles.typewriter}>
      {"> "}
      {displayedText}
      <span className={styles.cursor} />
    </div>
  );
};

export default Typewriter;
