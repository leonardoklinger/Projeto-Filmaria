import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'

import Home from './pages/Home'
import Filme from './pages/Filme'
import Favoritos from './pages/Favoritos'
import Erro from './pages/Erro'

const RoutesFuction = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path='/' exact='true' element={<Home />}></Route>
                <Route exact path='/filme/:id' element={<Filme />}></Route>
                <Route exact path='/favoritos' element={<Favoritos />}></Route>
                <Route exact path='*' element={<Erro/>}></Route>
            </Routes>
        </Router>
    )
}

export default RoutesFuction