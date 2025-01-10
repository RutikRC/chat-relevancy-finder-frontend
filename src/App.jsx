import { useEffect } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import router from './Router';
import UniversalLoading from './atoms/Loader';

function App() {
  return (
    <>
      <div className="w-full h-[90vh] flex items-center justify-center">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
