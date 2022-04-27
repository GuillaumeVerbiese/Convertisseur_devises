// == Import : nmp
import PropTypes from 'prop-types';

// == Composant
function Currency({ name, click }) {
  return (
    <li
      className="currency"
      onClick={() => {
        click(name);
      }}
    >
      {name}
    </li>
  );
}

Currency.propTypes = {
  name: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};

// == Export
export default Currency;
