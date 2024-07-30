import Icon from '@/components/common/Icon';

const sitemapData = [
  { name: 'Home', url: '/' },
  {
    name: 'Blog',
    url: '/blog',
    children: [
      { name: 'Tags', url: '/blog/tags' },
      { name: 'Archive', url: '/blog/archive' },
    ],
  },
  { name: 'Wiki', url: '/wiki' },
  { name: 'Now', url: '/now' },
  { name: 'Privacy Policy', url: '/privacy-policy' },
];

function Sitemap() {
  return (
    <section className="now content container mx-auto min-h-screen w-1/2 max-w-[920px] py-10 text-light-white dark:text-white" id="now">
      <a href="/">
        <Icon name="arrow-left" /> krisozolins.com
      </a>
      <header className="my-10">
        <h1 className="text-4xl font-bold text-left">Sitemap</h1>
      </header>
      <div className="flex flex-col gap-5">
        {sitemapData.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            {item.url === '/' ? <h2 className="text-xl font-bold">{item.name}</h2> : <h3 className="text-lg font-bold ms-3">{item.name}</h3>}
            {item.children && (
              <div className="flex flex-col gap-1 ms-6">
                {item.children.map((child, index) => (
                  <a key={index} href={child.url} className="text-blue-500 hover:text-blue-600">
                    {child.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sitemap;
