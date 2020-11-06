import './App.css';
import AuthPage from './containers/pages/AuthPage';
import { AuthProvider } from './context/authContext/authContext';
function App() {
  return (
    <AuthProvider>
      <AuthPage/>
    </AuthProvider>
  );
}

export default App;
