import { createContext, useCallback, useState, useContext, FC } from 'react';

interface AuthState {
  user: SignInCredentials;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: SignInCredentials;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  authUser: SignInCredentials;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC = ({children}) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@Dragon:user');

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const [auth] = useState<AuthState>(() => {
    const userData = {
      email: 'dragao@email.com',
      password: 'dragao123',
    };

    return { user: userData };
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = {
      email,
      password,
    };
    
    const user = response;
    localStorage.setItem('@Dragon:user', JSON.stringify(user));

    setData({ user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Dragon:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signOut, signIn, authUser: auth.user }}
     >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
