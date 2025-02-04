import Login from './pages/customer/login';
import Home from './pages/customer/home';
import Journal from './pages/customer/journal';
import ListLapangan from './pages/customer/list-lapangan';
import DetailLapangan from './pages/customer/detail-lapangan';
import DetailFasilitas from './pages/customer/detail-fasilitas';
import Payment from './pages/customer/payment';
import GiveRating from './pages/customer/give-rating';
import DetailRating from './pages/customer/detail-rating';
import Setting from './pages/customer/setting';
import Leaderboard from './pages/customer/leaderboard';

import Dashboard from './pages/admin/dashboard';
import Report from './pages/admin/report';
import User from './pages/admin/user';
import Rating from './pages/admin/rating';

import './index.css';
import { Routes, Route } from "react-router-dom"

import Unauthorized from './components/unauthorized'
import Missing from './components/missing'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/product/:namaProduct" element={<ListLapangan />} />
        <Route path="/product/lapangan/:namaProduct/:idProduct" element={<DetailLapangan />} />
        <Route path="/product/fasilitas/:namaProduct/:idProduct" element={<DetailFasilitas />} />
        <Route path="/product/rating/:namaProduct/:idProduct" element={<DetailRating />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product/give-rating/:idPayment/:idProduct" element={<GiveRating />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/user" element={<User />} />
        <Route path="/rating" element={<Rating />} />

        <Route path="*" element={<Missing />} />/
        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </div >
  )
}

export default App