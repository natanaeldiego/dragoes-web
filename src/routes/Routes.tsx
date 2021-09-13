import {ComponentType, FC} from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

const Route: FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user, authUser } = useAuth();
  let checkSignin = false;

  if ((user?.email === authUser.email) && user?.password === authUser.password) {
    checkSignin = true;
  }

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === checkSignin ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
