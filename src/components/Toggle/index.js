// == Import : npm
import PropTypes from 'prop-types';

// == Import : local
import './toggle.scss';

// == Composant
function Toggle({ open, manageClick }) {
  let cssClass;
  if (open) {
    cssClass = 'toggle toggle--open';
  }
  else {
    cssClass = 'toggle';
  }

  return (
    <button
      className={cssClass}
      type="button"
      onClick={manageClick}
    >
      =
    </button>
  );
}

Toggle.propTypes = {
  open: PropTypes.bool.isRequired,
  manageClick: PropTypes.func.isRequired, // Type : fonction
};

// == Export
export default Toggle;
