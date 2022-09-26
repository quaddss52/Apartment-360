import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Category from './pages/Category';
import Profile from './pages/Profile';
import CreateListings from './pages/CreateListings';
import Listing from './pages/Listing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SingIn';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = '/' element ={<Explore />} />
          <Route path = '/offers' element ={<Offers />} />
          <Route path = '/category/:categoryName' element ={<Category />} />
          <Route path='/profile' element ={<PrivateRoute/>}>
              <Route path = '/profile' element ={<Profile />} />
          </Route>
          <Route path = '/sign-in' element ={<SignIn />} />
          <Route path = '/sign-up' element ={<SignUp />} />
          <Route path = '/forgot-password' element ={<ForgotPassword />} />
          <Route path = '/create-listing' element ={<CreateListings />} />
          <Route path = '/category/:categoryName/:listinId' element ={<Listing />} />
        </Routes>
        <Navbar/>
      </Router>
     <ToastContainer/>
      
    </>
  );
}

export default App;
