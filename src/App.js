
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/auth';
import ChatPage from './pages/Chat/ChatPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className='h-screen md:overflow-scroll overflow-hidden'>

    
        <Routes>
          <Route exact path='/auth' element={<Auth />} />
          <Route exact path='/' element={<ChatPage />} />
        </Routes>

        <ToastContainer position='top-center'/>
    </div>
  );
}

export default App;
