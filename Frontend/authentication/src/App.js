import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Home from './Components/Home';


function App() {
  return (
    <div >
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
