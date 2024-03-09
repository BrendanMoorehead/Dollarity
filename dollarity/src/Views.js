import { Route, Routes } from 'react-router-dom';
import LoginScreen from './Components/LoginScreen';
import Dashboard from './Components/Pages/Dashboard';
const Views = () => {
  return (
    <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* Nonexistent Routes */}
        <Route path="*" element={<div>404 not found</div>} />
    </Routes>
  )
}

export default Views