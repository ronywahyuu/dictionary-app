// import lodash
import './components/AppBar';
import './components/TitleBar';
import './components/SearchBar';
import './components/MainResult';
import './components/MeaningResult';
import searchAPI from '../helpers/api';

const App = () => {
  // const
  const searchElement = document.querySelector('search-bar');
  const mainResultElement = document.querySelector('main-result');
  const meaningResultElement = document.querySelector('meaning-result');

  const renderMainResult = (result) => {
    mainResultElement.result = result;
    meaningResultElement.results = result;
  };

  const renderError = (title, message, resolution) => {
    mainResultElement.renderError();
    meaningResultElement.renderEmptyPage(title, message, resolution);
  };

  const onSubmitSearch = async (event) => {
    event.preventDefault();
    mainResultElement.renderLoading();
    meaningResultElement.renderLoading();
    try {
      const res = await searchAPI.search(searchElement.value);
      // console.log(res.data)
      renderMainResult(res.data);
    } catch (error) {
      const { title, message, resolution } = error.response.data;
      renderError(title, message, resolution);
      // alert('word not found');
    }
    // console.log('submit')
  };

  searchElement.clickEvent = onSubmitSearch;
};

export default App;
