import { Outlet, useLocation } from 'react-router-dom';
import Top from './Top';

interface User {
  name: string;
}

const Dashboard = () => {
  const location = useLocation();
  
  // Check if user is available and has a valid type
  const user: User | undefined = location.state?.user;

  return (
    <div className='w-[100vw] min-h-[90vh]'>
      <Top user={user || { name: 'Guest' }} />
      <Outlet />
    </div>
  );
};

export default Dashboard;
