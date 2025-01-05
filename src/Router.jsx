import { createBrowserRouter } from 'react-router-dom';
import CreateForm from './pages/InputForm';

const router = createBrowserRouter([
    {
        path: "/",
        element: <CreateForm />,
    },
]);


export default router;
            