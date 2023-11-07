import './App.css';
import { Route,Routes } from 'react-router-dom';
import ManageClient from './Component/ManageClient';
import ManageUserProfile from './Component/ManageClientProfile';
function App() {
  return (
      <Routes>
          <Route path="/"element={<ManageClient/>}/>
         <Route path="/ManageUserProfile/:id"element={<ManageUserProfile/>}/>
         </Routes>
  );
}
export default App;
