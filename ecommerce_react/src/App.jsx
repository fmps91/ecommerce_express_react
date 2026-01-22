
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Shop from './Pages/Shop/Shop';
import ShopCategory from './Pages/ShopCategory/ShopCategory'
import Product from './Pages/Product/Product';
import Cart from './Pages/Cart/Cart';
import SignInSignup from './Pages/Auth/Auth';
import RecoveryAccount from './Pages/RecoveryAccount/RecoveryAccount'
import Footer from './Components/Footer/Footer'
import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import kid_banner from './assets/banner_kids.png'

function App() {

  return (
   
      <div>
        
          <BrowserRouter>
          <Navbar/>
          <Routes>
            
            <Route path='/' element={<Shop/>}/>
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
            <Route path='/product' element={<Product/>}>
              <Route path=':productId' element={<Product/>}/>
            </Route>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<SignInSignup/>}/>
            <Route path='/recovery' element={<RecoveryAccount/>}/>
          </Routes>
          <Footer/>
          </BrowserRouter>
      </div>
   
  )
}

export default App
