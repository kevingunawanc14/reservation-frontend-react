import Login from './pages/customer/login';
import Home from './pages/customer/home';
import Journal from './pages/customer/journal';
import ListGor from './pages/customer/list-gor';
import DetailGor from './pages/customer/detail-gor';
import DetailLapangan from './pages/customer/detail-lapangan';
import Payment from './pages/customer/payment';
import DetailAccount from './pages/customer/detail-account';
import Leaderboard from './pages/customer/leaderboard';
import Challange from './pages/customer/challange';
import Shop from './pages/customer/shop';

import ActiveOrder from './pages/admin/active-order';
import Dashboard from './pages/admin/dashboard';
import ListUser from './pages/admin/list-user';
import MoneyManagement from './pages/admin/money-management';

import './index.css';
import { Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Routes>
        {/* customer */}
        <Route path="/login" element={<Login />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list-gor" element={<ListGor />} />
        <Route path="/detail-gor" element={<DetailGor />} />
        <Route path="/detail-lapangan" element={<DetailLapangan />} />
        <Route path="/list-order" element={<Payment />} />
        <Route path="/detail-account" element={<DetailAccount />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/challange" element={<Challange />} />
        <Route path="/shop" element={<Shop />} />
        {/* admin */}
        <Route path="/active-order" element={<ActiveOrder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list-user" element={<ListUser />} />
        <Route path="/money-management" element={<MoneyManagement />} />
        <Route path="*" element={<Home />} />/
      </Routes>
    </div>
  )
}

export default App