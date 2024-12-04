// src/hooks/useAuthCheck.js
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Waktu saat ini dalam detik

      if (decodedToken.exp < currentTime) {
        // Token kedaluwarsa
        localStorage.removeItem('token');
        localStorage.removeItem('role'); // Hapus data lainnya jika perlu
        navigate('/login'); // Redirect ke halaman login
      }
    }
  }, [navigate]);
};

export default useAuthCheck;
