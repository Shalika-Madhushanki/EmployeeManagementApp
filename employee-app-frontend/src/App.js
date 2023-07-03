import './App.css';
import {ListEmployeesComponent} from "./components/ListEmployeesComponent";
import {HeaderComponent} from "./components/HeaderComponent";
import {FooterComponent} from "./components/FooterComponent";
import {CreateEmployeeComponent} from "./components/CreateEmployeeComponent"
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import {ViewEmployeeComponent} from "./components/ViewEmployeeComponent"

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="employees" element={<ListEmployeesComponent/>}/>
            <Route path="add-employee/:id" element={<CreateEmployeeComponent />}/>
            <Route path="view-employee/:id" element={<ViewEmployeeComponent />}/>

            <Route path="/" element={<ListEmployeesComponent />}/>
        </>

    )
);
function App() {
  return (
      <div>
                  <HeaderComponent />
                  <div className="container">
                      <RouterProvider router={router}/>
                  </div>
                  <FooterComponent />

      </div>

  );
}

export default App;
