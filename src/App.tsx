import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/Global.css';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import DataProvider from './hooks';

function App() {
  return (
    <Router>
      <DataProvider>
      <Routes />
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      </DataProvider>
    </Router>
  );
}

export default App;
