import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Root } from './components/Root'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { SecureRoute } from './components/SecureRoute'
import { AddBucket } from './pages/AddBucket'
import { Bucket } from './pages/Bucket'
import './assets/css/bootstrap.min.css'
import './assets/css/lineicons.css'
import './assets/css/main.css'
import './assets/css/materialdesignicons.min.css'
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path='/dashboard' element={<Layout />}>
          <Route index element={
            <SecureRoute>
              <Dashboard/>
            </SecureRoute>
          }/>
          <Route path='addBucket' element={
            <SecureRoute> 
              <AddBucket/>
            </SecureRoute>  
          }/>
      </Route> 
      <Route path='buckets/:idBucket' element={<Layout />}> 
          <Route index element={
            <SecureRoute> 
              <Bucket/>
            </SecureRoute> 
          }/>
      </Route>
      <Route index element={<Login/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />
}

export default App
