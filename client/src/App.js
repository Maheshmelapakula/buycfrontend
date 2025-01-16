import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import DealerDashboard from "./components/DealerDashboard/DealerDashboard"; // Adjust the path as needed
import Dashboard from "./pages/dashboard";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AddOEMModel from "./components/OEM/AddOEMModel";
import OEMCount from "./components/OEM/OEMCount";
import SearchOEMSpecs from "./components/OEM/SearchOEMSpecs";
import Homepage from "./pages/Home";
import BuyCarPage from "./pages/BuyCarPage";
import ConfirmPurchase from "./pages/ConfirmBuying";

const App = () => {
  // Mock user role (replace with actual logic from your authentication system)
  const userRole = "dealer"; // Change this value dynamically (e.g., from user authentication)

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add-car' element={<AddCar/>}/>
        <Route path="/buy-car" element={<BuyCarPage />} />
        <Route path="/confirm-purchase" element={<ConfirmPurchase />} />

        <Route path='/edit-car/:carId' element={<EditCar/>}/>
        <Route path='/oem-add' element={<AddOEMModel/>}/>
        <Route path='/oem-count' element={<OEMCount/>}/>
        <Route path='/oem-search' element={<SearchOEMSpecs/>}/>






        

        {/* Protected Route for Dealers */}
        {userRole === "Dealer" ? (
          <Route path="/dealer-dashboard" element={<DealerDashboard />} />
        ) : (
          <Route path="/dealer-dashboard" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

