import { useEffect, createRef } from 'react';
import dayjs from 'dayjs';

function LocalTime() {
  const timeRef = createRef<HTMLTimeElement>();

  useEffect(() => {
    const updateLocalTime = () => {
      const time = dayjs().tz('Europe/Riga');

      if (timeRef.current) {
        timeRef.current.dateTime = time.format();
        timeRef.current.textContent = `EEST (UTC+3) ${time.format('HH:mm:ss')}`;
      }
    };

    updateLocalTime();
    const interval = setInterval(updateLocalTime, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return <time ref={timeRef} dateTime="" className="text-sm"></time>;
}

export default LocalTime;
