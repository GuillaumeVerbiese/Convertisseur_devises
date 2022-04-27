// == Import : npm
import PropTypes from 'prop-types';

// == Import : local
// Composant
import Currency from './Currency';
// Srtyle
import './currencies.scss';

// == Composant
function Currencies({
  currencies,
  handleClick,
  searchValue,
  setSearch,
}) {
  // https://fr.reactjs.org/docs/forms.html

  // Mise en place d'un champ contrôlé :
  // - Avoir une case dans le state qui va contenir la valeur de l'input
  // - Controle en lecture : Afficher la valeur du state dans l'input
  // - Controle en ecriture : Modifier la valeur dans le state
  // Cf. le shcéma : https://excalidraw.com/#json=fvoLl94jSBC8Q7kMjM-Yi,1kzJKoP1HiUR0F3mApmcmw
  return (
    <div className="currencies">
      <input
        type="text"
        className="currencies-search"
        placeholder="Rechercher"
        value={searchValue}
        onChange={(event) => {
          console.log(`onChange : ${event.currentTarget.value}`);
          setSearch(event.currentTarget.value);
        }}
      />
      <ul>
        {currencies.map((currency) => (
          <Currency {...currency} click={handleClick} key={currency.name} />
        ))}
      </ul>
    </div>
  );
}

Currencies.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

// == Export
export default Currencies;
