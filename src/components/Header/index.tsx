import { useAuth } from '../../hooks/auth';
import './styles.css';

function Header() {
  const { signOut } = useAuth();

  return (
    <div className="header-container">
      <div className="header-row">
        <div className="header">
          <h1>Dragões</h1>
        </div>

        <div className="navbar">
          <span onClick={signOut}>Sair</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
