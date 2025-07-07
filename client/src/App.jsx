import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/common/Header';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ChangePassword from './components/auth/ChangePassword';
import Dashboard from './components/admin/Dashboard';
import UserList from './components/admin/UserList';
import StoreList from './components/admin/StoreList';
import CreateUser from './components/admin/CreateUser';
import CreateStore from './components/admin/CreateStore';
import StoreRatings from './components/storeOwner/StoreRatings';
import OverallRating from './components/storeOwner/OverallRating';
import UserStoreList from './components/user/StoreList';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Container className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes - Admin */}
          <Route path="/admin/dashboard" element={<PrivateRoute roles={['admin']}><Dashboard /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute roles={['admin']}><UserList /></PrivateRoute>} />
          <Route path="/admin/users/create" element={<PrivateRoute roles={['admin']}><CreateUser /></PrivateRoute>} />
          <Route path="/admin/stores" element={<PrivateRoute roles={['admin']}><StoreList /></PrivateRoute>} />
          <Route path="/admin/stores/create" element={<PrivateRoute roles={['admin']}><CreateStore /></PrivateRoute>} />

          {/* Private routes - Store Owner */}
          <Route path="/store-owner/ratings" element={<PrivateRoute roles={['store_owner']}><StoreRatings /></PrivateRoute>} />
          <Route path="/store-owner/overall" element={<PrivateRoute roles={['store_owner']}><OverallRating /></PrivateRoute>} />

          {/* Private routes - User */}
          <Route path="/user/stores" element={<PrivateRoute roles={['user']}><UserStoreList /></PrivateRoute>} />

          {/* Common private routes */}
          <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />

          {/* Default route */}
          <Route path="/" element={<Login />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;