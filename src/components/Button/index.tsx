import { ButtonHTMLAttributes, FC } from 'react';
import  './styles.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <button {...rest}>
    {loading ? 'Carregando...' : children}
  </button>
);

export default Button;
