import {FC} from 'react';
import { AuthProvider } from './auth';

const DataProvider: FC = ({children}) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

export default DataProvider;
