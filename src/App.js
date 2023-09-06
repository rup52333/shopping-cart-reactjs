import Header from './Component/Header.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Component/Home.jsx';
import Cart from './Component/Cart.jsx';
import Context from './Context/Context';
import Login from './Component/Login.jsx';
function App() {
  return (
    <Context>
    <BrowserRouter>


  <Header/>
 <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/cart" element={<Cart/>} />
    <Route path="/login" element={<Login/>} />

  </Routes>

</BrowserRouter>
</Context>
  )
}

export default App;

