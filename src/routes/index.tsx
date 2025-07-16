import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import JewelForm from '../components/forms/JewelForm';
import ServiceForm from '../components/forms/ServiceForm';

export default function AppRoutes() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<PrivateRoute />}>
          <Route path="/jewels/new" element={<JewelForm />} />
          <Route path="/jewels/:id/edit" element={<JewelForm />} />
          <Route path="/services/new" element={<ServiceForm />} />
          <Route path="/services/:id/edit" element={<ServiceForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} 