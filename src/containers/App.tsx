import {Route, Routes} from 'react-router-dom';
import Home from './Home/Home';
import AddMeal from './AddMeal/AddMeal';
import Layout from './Layout/Layout';


const App = () => (
  <>
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add-meal" element={<AddMeal/>}/>
        <Route path="/edit-meal/:id" element={<AddMeal/>}/>
      </Routes>
    </Layout>
  </>
);

export default App;
