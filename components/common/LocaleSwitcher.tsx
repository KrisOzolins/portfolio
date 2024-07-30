import { useRouter } from 'next/router';

const LocaleSwitcher = () => {
  const router = useRouter();

  const changeLocale = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div>
      <button onClick={() => changeLocale('en')}>English</button>
      <button onClick={() => changeLocale('lv')}>Latvian</button>
    </div>
  );
};

export default LocaleSwitcher;
