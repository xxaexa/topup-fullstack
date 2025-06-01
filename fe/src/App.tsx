import { Routes, Route } from "react-router-dom";
import {
  Home,
  Voucher,
  Login,
  DashboardLayout,
  Transaction,
  HomeStore,
  StoreLayout,
  Track,
  TransactionStore,
  VoucherStore,
  AddVoucherPage,
  UpdateVoucherPage,
  TutorialPage,
  Register,
} from "./pages/";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <Routes>
        HomeStore
        <Route path="/" element={<StoreLayout />}>
          <Route index element={<HomeStore />} />
          <Route path="voucher/:id" element={<VoucherStore />} />
          <Route path="track" element={<Track />} />
          <Route path="transaction/:id" element={<TransactionStore />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="voucher" element={<Voucher />} />
          <Route path="voucher/add" element={<AddVoucherPage />} />
          <Route path="voucher/update/:id" element={<UpdateVoucherPage />} />
          <Route path="transaction" element={<Transaction />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tutorial" element={<TutorialPage />} />
      </Routes>
    </div>
  );
};

export default App;

//
