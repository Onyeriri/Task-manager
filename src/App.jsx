import { ToastContainer} from 'react-toastify';
import Form from './components/Form';
import Items from './components/Items';
import { useFetch } from './reactQueryCustomHook';

const App = () => {

  return (
    <section className='section-center'>
      <ToastContainer position='top-center' />
      <Form />
      <Items />
    </section>
  );
};

export default App;
