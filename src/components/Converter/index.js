// == Import : npm
import React from 'react';

// == Import : local
// Datas
import currenciesList from 'src/data/currencies';
// Composant
import Header from '../Header';
import Currencies from '../Currencies';
import Amount from '../Amount';
import Toggle from '../Toggle';
// Style
import './styles.scss';

// == Composant
class Converter extends React.Component {
  // Pour mettre en place un state :
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    // State
    this.state = {
      isOpen: false,
      baseAmount: 1,
      currency: 'United States Dollar',
      search: '',
    };
  }

  componentDidMount() {
    console.log('componentDidMount : Execution lors du premier rendu');
    const { currency } = this.state;
    document.title = currency;

    document.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') {
        this.setState({
          isOpen: false,
        });
      }
    });
  }

  componentDidUpdate() {
    console.log('componentDidUpdate : Execution à chaque re-rendu');
    const { currency } = this.state;
    document.title = currency;
  }

  handleCurrencyClick(name) {
    this.setState({
      currency: name,
    });
  }

  handleClick() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  handleChangeSearch(value) {
    this.setState({
      search: value,
    });
  }

  // Fonction qui retourne la liste des devises par rapport au critère de recherche
  // Critère de recherche : le state
  getFilteredCurrencies() {
    // Pour filter les devises, on a besoin de critère de recherhe de l'utilisateur
    // C'est à dire la valeur de le propriété search du state
    const { search } = this.state;

    // Si l'utilisateur ne renseigne aucun critère de recherche,
    // De base, la liste de devises qu'on renvoie est complète
    let filteredCurrencies = currenciesList;

    // Si l'utilisateur commence à renseigner un critère de recherche
    if (search.length > 0) {
      // Alors on filtre en fonction du critère de recherche
      // pour renvoyer une liste de devises qui correspond au critère de recherche
      filteredCurrencies = currenciesList.filter((item) => {
        // On fait en sorte de régler les soucis de casse : les majuscules vs minuscules
        // On force les chaines de caractères en minuscule pour pouvoir faire la comparaison
        const nameLowerCase = item.name.toLowerCase();
        const inputSearchLowerCase = search.toLowerCase();

        // On fait la comparaison avec la fonction includes
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
        // On regarde si l'entrée utilisateur est contenue dans le nom de la devise courante
        return nameLowerCase.includes(inputSearchLowerCase);
      });
    }

    return filteredCurrencies;
  }

  // Fonction qui retourne le resultat de conversion
  makeConversion() {
    // On recup les données depuis notre state
    const { baseAmount, currency } = this.state;
    // On recup les infos de la devise choisie
    const currencyData = currenciesList.find((item) => item.name === currency);
    // On extrait le taux de conversion
    const { rate } = currencyData;
    // On fait la conversion
    const result = baseAmount * rate;
    // On limite à 2 décimales
    const formattedResult = Math.round(result * 100) / 100;

    return formattedResult;
  }

  render() {
    const {
      isOpen,
      baseAmount,
      currency,
      search,
    } = this.state;

    // On recup le resultat de conversion
    // Pour l'envoyer au composant qui doit l'afficher
    const result = this.makeConversion();

    const filteredCurrencies = this.getFilteredCurrencies();
    // console.log(filteredCurrencies);

    // On envoie la fonction handleClick en prop à notre composant Toggle
    // car c'est sur ce composant qui va l'executer au moment du click.
    return (
      <div className="converter">
        <Header baseAmount={baseAmount} />
        <Toggle open={isOpen} manageClick={this.handleClick} />
        {isOpen && (
          <Currencies
            currencies={filteredCurrencies}
            handleClick={this.handleCurrencyClick}
            searchValue={search}
            setSearch={this.handleChangeSearch}
          />
        )}
        <Amount currency={currency} value={result} />
      </div>
    );
  }
}

// == Export
export default Converter;
