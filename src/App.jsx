import Login from './pages/customer/login';
import Home from './pages/customer/home';
import Journal from './pages/customer/journal';
import ListLapangan from './pages/customer/list-lapangan';
import DetailLapangan from './pages/customer/detail-lapangan';
import Payment from './pages/customer/payment';
import Setting from './pages/customer/setting';
import Leaderboard from './pages/customer/leaderboard';
import Shop from './pages/customer/shop';

import Dashboard from './pages/admin/dashboard';
import Report from './pages/admin/report';
import User from './pages/admin/user';
import Challange from './pages/admin/challange';
import Court from './pages/admin/court';

import './index.css';
import { Routes, Route } from "react-router-dom"

import Unauthorized from './components/unauthorized'
import Missing from './components/missing'

import Layout from './components/layout';

import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/lapangan/:namaLapangan" element={<ListLapangan />} />
            <Route path="/lapangan/:namaLapangan/detail/:nomorLapangan" element={<DetailLapangan />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/shop" element={<Shop />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report" element={<Report />} />
            <Route path="/user" element={<User />} />
            <Route path="/challange" element={<Challange />} />
            <Route path="/court" element={<Court />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />/
      </Route>

    </Routes>
  )
}

export default App