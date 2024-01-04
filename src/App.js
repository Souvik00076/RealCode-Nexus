import './App.scss';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import EditorPage from './pages/EditorPage'
function App() {
  return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/editor/:room-id' element={<EditorPage/>}></Route>
            </Routes>
          </BrowserRouter>
        </>
    )
}

export default App;
