import {Routes, Route} from 'react-router-dom'
import AddProduct from '../components/admin/addProduct/AddProduct'
import AdminSideBar from '../components/admin/adminSidebar/AdminSideBar'
import ViewOrders from '../components/admin/viewOrders/ViewOrders'
import ViewProducts from '../components/admin/viewProducts/ViewProducts'
import OrderDetails from '../components/admin/viewOrders/OrderDetails'
import AddCategory from '../components/admin/category/AddCategory'
import UpdateProduct from '../components/admin/addProduct/UpdateProduct'
 

function Admin() {
    return (
        <div className='flex '>
          {/* left section */}
          <div className='w-[25%]'>
          <AdminSideBar/>
          </div>
    
          {/* Nested routes for admin */}
          <div className='w-full'>
          <Routes>
          <Route path='all-products' element={<ViewProducts/>}/>
          <Route path='add-product' element={<AddProduct/>}/>
          <Route path='update-product/:id' element={<UpdateProduct/>}/>
          <Route path='orders' element={<ViewOrders/>}/>
          <Route path='categories' element={<AddCategory/>}/>
          <Route path='categories/:id' element={<AddCategory/>}/>
          <Route path='order-details/:id' element={<OrderDetails/>}/>
          </Routes>
          </div>
        </div>
      )
}

export default Admin