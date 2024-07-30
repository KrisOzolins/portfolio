import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import PropTypes from 'prop-types';

function Icon({
  name,
  style = 'solid',
  size = '1x',
  color = '',
  className = '',
}: {
  name: string;
  style?: string;
  size?: string;
  color?: string;
  className?: string;
}) {
  return <FontAwesomeIcon icon={`fa-${style} fa-${name}` as IconProp} size={size as SizeProp} color={color} fixedWidth className={className} />;
}

// Icon.propTypes = {
//   name: PropTypes.string.isRequired,
//   style: PropTypes.oneOf(['solid', 'regular', 'light', 'duotone', 'brands']),
//   size: PropTypes.oneOf(['xs', 'sm', 'lg', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']),
//   color: PropTypes.string,
//   className: PropTypes.string,
// };

// Icon.defaultProps = {
//   style: 'solid',
//   size: '1x',
//   color: '',
//   className: '',
// };

export default Icon;
