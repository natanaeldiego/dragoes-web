import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import Button from '../../components/Button';
import './styles.css';
import { useAuth } from "../../hooks/auth";

interface IFormSignInInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().trim().email('O email precisa ser válido!').required('O campo de email precisa ser preenchido'),
  password: yup.string().trim().required('O campo de password precisa ser preenchido'),
});

function SignIn() {
  const { signIn, authUser } = useAuth();
  const history = useHistory();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormSignInInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data: IFormSignInInputs) => {
    const { email, password} = data;
    if (email === authUser.email && password === authUser.password) {
      await signIn({
        email: email,
        password: password,
      });
      reset();
      history.push('/dashboard');
    } else {
      toast.error('Desculpe, mas seu e-mail ou password não confere!');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-row">
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          <label>
            E-mail<span className="item-required">*</span>
          </label>
          <input type="email"
            {
            ...register("email", {
              required: true,
              maxLength: 20
            })
            } placeholder="Digite seu e-mail aqui" />
          {errors.email?.message && (
            <span className="error">{errors.email?.message}</span>
          )}

          <label>
            Senha<span className="item-required">*</span>
          </label>
          <input type="password"
            {
            ...register("password", {
              required: true,
              maxLength: 20
            })
            }
            placeholder="Digite sua senha aqui" />
          {errors.password?.message && (
            <span className="error">{errors.password?.message}</span>
          )}

          <div className="signin-btn-login">
            <Button>Login</Button>
          </div>
        </form>
        </div>
      </div>
  );
}

export default SignIn;
