import './index.css'
import { SearchBar } from './components/SearchBar'
import { FillAllCharacters } from './components/GetAllCharacters'


function App() {

  return (
    <div id='APP-CONTAINER'>
      <div id='SEARCH-BAR-COMPONENT'>
          <SearchBar></SearchBar>
      </div>
      <div id='CARDS-CONTAINER-COMPONENT'>
        <FillAllCharacters></FillAllCharacters>
      </div>
    </div>
  )
}

export default App
