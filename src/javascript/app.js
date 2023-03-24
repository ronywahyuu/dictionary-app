// import lodash
import "./components/AppBar.js"
import "./components/TitleBar.js"
import "./components/SearchBar.js"
import "./components/MainResult.js"
import "./components/MeaningResult.js"
import axios from "axios";
import searchAPI from "../helpers/api";
const App = () => {

  // const
  const searchElement = document.querySelector('search-bar')
  const mainResultElement = document.querySelector('main-result')
  const meaningResultElement = document.querySelector('meaning-result')

  // console.log(mainResultElement)
  const onSubmitSearch = async (event) =>{
    event.preventDefault()
    // console.log(searchElement.value)
    try{
      const res = await searchAPI.search(searchElement.value)
      // console.log(res.data)
      renderMainResult(res.data)
    }catch (error) {
      alert("word not found")
      console.log(error)
    }
    // console.log('submit')
  }

  const renderMainResult = (result) =>{
    mainResultElement.result = result
    meaningResultElement.results = result
  }


  searchElement.clickEvent = onSubmitSearch


  console.log('Hello from app.js')
}

export default App