import {Route, Routes} from 'react-router-dom';
import {useState} from 'react';
import {Alert} from 'react-bootstrap';
import Home from './Home/Home';
import AddMeal from './AddMeal/AddMeal';
import Layout from './Layout/Layout';


const App = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getError = (message: string) => {
    setError(message);
    setShowAlert(true);
  };

  return (<>
    <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>
        {error}
      </p>
    </Alert>
    <Layout>
      <Routes>
        <Route path="/" element={<Home getError={getError}/>}/>
        <Route path="/add-meal" element={<AddMeal getError={getError}/>}/>
        <Route path="/edit-meal/:id" element={<AddMeal getError={getError}/>}/>
      </Routes>
    </Layout>
  </>);
};

export default App;
