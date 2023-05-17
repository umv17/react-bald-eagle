import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={
          <>
            <Header isInNewPage={false} />
            <TodoContainer />
          </>
        } />
        <Route path="/new" element={<Header isInNewPage={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

