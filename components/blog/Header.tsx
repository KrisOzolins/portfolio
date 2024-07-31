const Header = ({ title, intro }: { title: string; intro: string }) => {
  return (
    <header className="my-10">
      <h1 className="text-4xl font-header font-bold text-center mb-1">{title}</h1>
      <p className="text-center">{intro}</p>
    </header>
  );
};

export default Header;
