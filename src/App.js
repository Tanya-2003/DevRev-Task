import logo from './logo.svg';
import './App.css';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import Search from '../src/Search'
import VerifyEmail from './component/VerifyEmail';
import {  Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../src/component/AuthContext';
import {useState,useEffect} from 'react'
import {auth} from './component/Firebase'
import {onAuthStateChanged} from 'firebase/auth'
import Home from './component/Home';
import BookList from "./component/BookList/BookList";
import BookDetails from "./component/BookDetails/BookDetails";
import { AppProvider } from './context';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])
  return (
    <div className="App">
      <AppProvider>
      <AuthProvider value={{currentUser,timeActive, setTimeActive}}>
         <Routes>
         
          <Route path="/" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/VerifyEmail" element={<VerifyEmail/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path = "book" element = {<BookList />} />
          <Route path = "/book/:id" element = {<BookDetails />} />
        

         </Routes>
         </AuthProvider>
         </AppProvider>
    </div>
  );
}

export default App;
