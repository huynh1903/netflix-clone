import { Outlet } from "react-router-dom"

const ListRootLayout = () => {
  return (
    <div>
      {/* this is list RootLayout */}
      <Outlet />
    </div>
  )
}

export default ListRootLayout