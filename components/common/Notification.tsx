import { useEffect, useState } from 'react';
import Icon from './Icon';
import { capitalize } from '@/helpers';

// enum NotificationType {
//   Info = 'info',
//   Error = 'error',
// }

type NotificationType = 'info' | 'error';

function Notification({ type = 'info', message, onClose = () => {} }: { type: NotificationType; message: string; onClose?: () => void }) {
  const fadeoutDuration = 300; // Make sure to set this in tailwind.config.ts safelist as well.

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the notification.
    const timer = setTimeout(() => {
      setVisible(false); // This will trigger the fade out effect.
      setTimeout(onClose, fadeoutDuration); // Call onClose after the fade effect finishes.
    }, 3000); // 3 seconds before fading out begins.

    return () => clearTimeout(timer); // Clear the timer if the component unmounts.
  }, []);

  return (
    <>
      <div
        className={`notification ${type} flex items-center p-4 mb-4 text-sm rounded-lg fixed bottom-3 z-50 left-1/2 -translate-x-1/2 max-w-[500px] transition-all duration-${fadeoutDuration} ${type === 'info' ? 'bg-gray-800 text-blue-400' : 'bg-red-800 text-red-300'} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        role="alert"
      >
        {type === 'info' ? <Icon name="circle-info" /> : <Icon name="circle-exclamation" />}
        <p>
          <span className="font-medium">{capitalize(type)}!</span> {message}
        </p>
        {/* <button className="absolute top-0 right-0 p-4" onClick={onClose} aria-label="Close notification" title="Close notification">
          <Icon name="times" />
        </button> */}
      </div>
    </>
  );
}

export default Notification;
