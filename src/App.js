import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Header from './components/Header';
import CouponList from './components/CouponList';
import AddCoupon from './components/AddCoupon';
import RedeemCoupon from './components/RedeemCoupon';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div className="App">
<Router>
  <Header />
  <Routes>
  <Route path='/' element={  <CouponList />} ></Route>
   <Route path='/add-coupon' element={<AddCoupon />} ></Route>
   <Route path='/redeem-coupon' element={<RedeemCoupon />} ></Route>
  </Routes>
</Router>
    </div>
  );
}

export default App;
