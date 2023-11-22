import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
import { privateRoutes, publicRoutes, specialRoutes, writerRoutes } from '@/routes/index'
import { ToastContainer } from 'react-toastify'
// import PrivateRoutes from "@/routes/PrivateRoutes";
import './App.scss'
import { useSelector } from 'react-redux'
import { selectAuth } from './redux/store'
import PrivateRoute from './routes/PrivateRoute'
import MainLayout from './layouts/mainLayout'
import SpecialLayout from './layouts/specialLayout'
import DashLayout from './layouts/dashLayout'
function App() {
  const user = useSelector(selectAuth).login.user
  // const navigate = useNavigate();
  return (
    <>
      <Router>
        <div className='app'>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <MainLayout>
                      <Page />
                    </MainLayout>
                  }
                ></Route>
              )
            })}
            {privateRoutes.map((route, index) => {
              const Page = route.component
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute isAllowed={!!user}>
                      <MainLayout>
                        <Page />
                      </MainLayout>
                    </PrivateRoute>
                  }
                ></Route>
              )
            })}

            {specialRoutes.map((route, index) => {
              const Page = route.component
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <SpecialLayout>
                      <Page />
                    </SpecialLayout>
                  }
                ></Route>
              )
            })}
            {writerRoutes.map((route, index) => {
              const Page = route.component
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DashLayout>
                      <Page />
                    </DashLayout>
                  }
                ></Route>
              )
            })}
          </Routes>
        </div>
      </Router>
      <div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  )
}

export default App
