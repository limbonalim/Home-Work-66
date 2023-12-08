import Dish from '../components/Dish/Dish';
import Home from './Home/Home';
import {Route, Routes} from 'react-router-dom';
import AddMeal from './AddMeal/AddMeal';


const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add-meal" element={<AddMeal/>}/>
    </Routes>
  </>
);

export default App
