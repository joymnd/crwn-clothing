import React from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './routes/home/hompage.component';
import Shop from './routes/shop/shop.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/sign-in-and-sign-up/authentication.component';


const App = () => {
   return (
    <div>
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path='shop' element={<Shop/>}/>
          <Route path='sign-in' element={<Authentication/>}/>
        </Route>
      </Routes> 
    </div>
  )
}

export default App;
