import {Outlet} from "react-router-dom"

function AuthLayout() {
  return (
    <div className="w-full h-full" >
      
        <Outlet />
      
    </div>
  )
}

export default AuthLayout
