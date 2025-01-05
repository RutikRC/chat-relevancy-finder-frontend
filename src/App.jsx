import { useEffect } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getUser } from './features/authfunctions/userLogin';
import router from './Router'; // Import your router configuration
import UniversalLoading from './atoms/Loader';

function App() {
  // const dispatch = useDispatch();
  // const { isAuthenticated, userToken, loading, expand } = useSelector(
  //   (state) => state.user
  // );

  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(getUser());
  //   }
  // }, [dispatch, userToken]);

  // const handleKeyPress = (key) => {
 
  //     console.log(`Ctrl+${key} was pressed`);

    
  // };
  // useKeyPress(handleKeyPress);
  return (
    <>
      <div className="w-full h-[90vh] flex items-center justify-center">
        {/* {loading &&  */}
        {/* <UniversalLoading/> */}
        {/* } */}
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
