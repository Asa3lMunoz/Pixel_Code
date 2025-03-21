import {BrowserRouter, Routes, Route} from 'react-router-dom'
import IndexPage from './views/IndexPage'
import Ingresar from './views/IngresarPage'
export default function AppRouter() {
  return (

    <BrowserRouter>
        <Routes>
            <Route path='/' element={<IndexPage/>} />
            <Route path='/ingresar' element={<Ingresar/>} />
        </Routes>
    </BrowserRouter>

  )
}
