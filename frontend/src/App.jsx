import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Produk from './components/produk'; // pastikan huruf besar sesuai
import About from './components/about';
import Book from './components/book';
import AdminLogin from './components/LoginAdmin';
import DashboardLayout from './components/DashboardLayout';
import DataProduk from './components/DataProduk';
import AddProduct from './components/FormAddProduk';
import UserRegister from './components/FormRegisterUser';
import UserLogin from './components/LoginUser';
import CreateOrder from './components/createOrders';
import DashboardUser from './components/DashboardUser';
import PesananUser from './components/PesananUser';
import RiwayatPembelian from './components/RiwayatPembelian';
import DataPembeli from './components/DataPembeli';
import DataPembeliDetail from './components/DataPembeliDetail';
import DataPesanan from './components/DataPesanan';
import MenuLainnya from './components/MenuLainnya';
import UpdateStokForm from './components/UpdateStok';
import DataCourier from './components/DataCouries';
import AddCourier from './components/AddCouries';
import DataShipping from './components/DataShipping';
import TambahShipping from './components/AddShipping';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produk" element={<Produk />} />
      <Route path="/about" element={<About />} />
      <Route path="/book" element={<Book />} />
      <Route path="/LoginAdmin" element={<AdminLogin />} />
      <Route path="/RegisterUser" element={<UserRegister />} />
      <Route path="/LoginUser" element={<UserLogin />} />
      <Route path="/CreateOrder/:productId" element={<CreateOrder />} />

      <Route
        path="/DataProduk"
        element={
          <DashboardLayout>
            <DataProduk />
          </DashboardLayout>
        }
      />
      <Route
        path="/DataPembeli"
        element={
          <DashboardLayout>
            <DataPembeli />
          </DashboardLayout>
        }
      />
      <Route
        path="/DataPembeliDetail/:id"
        element={
          <DashboardLayout>
            <DataPembeliDetail />
          </DashboardLayout>
        }
      />
      <Route
        path="/DataPesanan"
        element={
          <DashboardLayout>
            <DataPesanan />
          </DashboardLayout>
        }
      />
      <Route
        path="/MenuLainnya"
        element={
          <DashboardLayout>
            <MenuLainnya />
          </DashboardLayout>
        }
      />
      <Route
        path="/UpdateStok/:id"
        element={
          <DashboardLayout>
            <UpdateStokForm />
          </DashboardLayout>
        }
      />
      <Route
        path="/DataCourier"
        element={
          <DashboardLayout>
            <DataCourier />
          </DashboardLayout>
        }
      />
      <Route
        path="/AddCourier"
        element={
          <DashboardLayout>
            <AddCourier />
          </DashboardLayout>
        }
      />
      <Route
        path="/DataShipping"
        element={
          <DashboardLayout>
            <DataShipping />
          </DashboardLayout>
        }
      />
      <Route
        path="/AddShipping"
        element={
          <DashboardLayout>
            <TambahShipping />
          </DashboardLayout>
        }
      />
      <Route path="/AddProduk" element={<AddProduct />} />
      <Route path="/User" element={<DashboardUser />} />
      <Route path="/PesananUser" element={<PesananUser />} />
      <Route path="/RiwayatUser" element={<RiwayatPembelian />} />
    </Routes>
  );
}
