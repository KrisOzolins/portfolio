// import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faExternalLink,
  faCheck,
  faXmark,
  faSun,
  faMoon,
  faArrowRight,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

// const faIconPrefix = {
//   regular: 'far',
//   solid: 'fas',
// };

// const Icon = ({ name, type = 'regular', className = '' }) => {
//   const iconLookup = { prefix: faIconPrefix[type], iconName: name };
//   const iconDefinition = findIconDefinition(iconLookup);
//   return <FontAwesomeIcon icon={iconDefinition} className={className} />;
// };

// export default Icon;

const iconMap = {
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faExternalLink,
  faCheck,
  faXmark,
  faSun,
  faMoon,
  faArrowRight,
  faPen,
};

const Icon = ({ name, className = '' }) => {
  return <FontAwesomeIcon icon={iconMap[name]} className={className} />;
};

export default Icon;
