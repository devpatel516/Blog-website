import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DataProvider from "./contex/DataProvider.jsx";
import Home from "./component/home/home.jsx";
import Login from "./component/account/login.jsx";
import Header from "./component/header/header.jsx";
import CreatePost from './component/create/createPost.jsx';
import DetailView from './component/details/Detailview.jsx';
import Update from './component/details/Update.jsx';
import Contact from './component/contact/contact.jsx';
import About from './component/about/about.jsx';
import Footer from './component/footer/footer.jsx';
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ?
    <>
      <Header />
      <Outlet />
      <Footer />
    </> : <Navigate replace to='/account' />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
          <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/home' element={<Home />} />
          </Route>

          <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/create' element={<CreatePost />} />
          </Route>

          <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
          </Route>

          <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
          </Route>

          <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
          </Route>

          <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;