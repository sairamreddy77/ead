import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import WatchList from './pages/WatchList'
import Favourites from './pages/Favourites'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './pages/SearchResults'
import MovieDetail from './pages/MovieDetail'



function App() {
  

  return (
  <Router>
    <>
    
      <Navbar/>
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/watch-list" element={<WatchList/>} />
              <Route path="/favourites" element={<Favourites/>} />
              <Route path="/search" element={<SearchResults />} />  {/* New search route */}
              <Route path="/movie/:id" element={<MovieDetail/>} /> 
          </Routes>
    
      
      
    </>
    </Router>
  )
}

export default App
