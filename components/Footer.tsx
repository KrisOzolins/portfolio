function Footer() {
  return (
    <footer className="flex flex-col-reverse justify-center px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0 relative container">
      <div className="flex flex-col justify-between">
        <div className="hidden md:block">
          Copyright <strong>KrisOzolins</strong> &copy; {new Date().getFullYear()}, All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
