import { useEffect, useState } from 'react';
import Icon from '../common/Icon';

const Chat = () => {
  return (
    <div className={`fixed bottom-8 right-8 flex-col gap-3`}>
      <button
        aria-label="Chat"
        className="rounded-full transition-all p-3 text-light-gray-light dark:text-gray-light bg-secondary-accent-regular hover:bg-secondary-accent-dark"
      >
        <Icon name="comment-dots" className="regular-icon" size="xl" />
      </button>
    </div>
  );
};

export default Chat;
