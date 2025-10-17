import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header';
import FooterComp from './components/Footer';
import CreatePost from './pages/CreatePost';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    <FooterComp />
    </BrowserRouter>
  );
};

export default App;
