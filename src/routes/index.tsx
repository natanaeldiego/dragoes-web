import {FC} from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

const Routes: FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
