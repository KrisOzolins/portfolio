import Icon from '@/components/common/Icon';
import useActiveSection from '@/lib/hooks/useActiveSection';

function NavPrimary() {
  const activeSection = useActiveSection(['home', 'about', 'details', 'services', 'contact']);

  const activeClass = (path: string) => {
    return activeSection === path ? 'bg-primary-accent' : '';
  };

  return (
    <>
      <nav className="w-full" aria-label="Primary navigation">
        <ul className="list-none m-0 p-0">
          <li>
            <a
              href="/#home"
              className={`text-white text-sm p-3 w-full hover:bg-primary-accent transition ease-linear duration-300 inline-block ${activeClass('home')}`}
            >
              <Icon name="house" /> Home
            </a>
          </li>
          <li>
            <a
              href="/#about"
              className={`text-white text-sm p-3 w-full hover:bg-primary-accent transition ease-linear duration-300 inline-block ${activeClass('about')}`}
            >
              <Icon name="circle-info" /> About
            </a>
          </li>
          <li>
            <a
              href="/#details"
              className={`text-white text-sm p-3 w-full hover:bg-primary-accent transition ease-linear duration-300 inline-block ${activeClass('details')}`}
            >
              <Icon name="user-large" /> Details
            </a>
          </li>
          <li>
            <a
              href="/#services"
              className={`text-white text-sm p-3 w-full hover:bg-primary-accent transition ease-linear duration-300 inline-block ${activeClass('services')}`}
            >
              <Icon name="wrench" /> Services
            </a>
          </li>
          <li>
            <a
              href="/#contact"
              className={`text-white text-sm p-3 w-full hover:bg-primary-accent transition ease-linear duration-300 inline-block ${activeClass('contact')}`}
            >
              <Icon name="address-card" /> Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavPrimary;
