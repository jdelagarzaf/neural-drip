import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './pages/Layout';

function App() {
  return (
    <Router>
        <Navbar />
        <Layout />
    </Router>
  );
}

export default App;
