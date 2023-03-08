
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import { Drugs }  from "./components/Drugs";
import { Login } from "./components/Login";
import { Pharmacies } from "./components/Pharmacies";


//определяем роуты в меню 
const ProtectedRoute = ({
  user,
  redirectPath,
  children
}) => {
  
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}



export const RoutesAll = (props) => {

    return (
       
        <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route key='E1' path='/drugs' element={<Drugs/>}/>
            <Route key='E2' path='/pharmacies' element={<Pharmacies/>}/>
        </Routes> 
    
    )

}

/*
 <Route path='/' element={<Navigate to='/login' />}/>
            <Route path='/home' element={<ProtectedRoute user={sessionStorage.getItem('login')} redirectPath='/login'><Home/></ProtectedRoute> }/>
            <Route path='/login' element={<ProtectedRoute user={sessionStorage.length===0} redirectPath='/home'><Login/></ProtectedRoute>}/>
            <Route key='E1' path='/drugs' element={<ProtectedRoute user={sessionStorage.getItem('login')}  redirectPath='/login'><Drugs/></ProtectedRoute>}/>
            <Route key='E2' path='/pharmacies' element={<ProtectedRoute user={sessionStorage.getItem('login')}  redirectPath='/login'><Drugs/></ProtectedRoute>}/>
            */
