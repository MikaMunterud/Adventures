import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./sass/App.scss";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AllAdventures from "./pages/AllAdventures";
import SingleAdventure from "./pages/SingleAdventure";
import AddNewAdventure from "./pages/AddNewAdventure";
import EditAdventure from "./pages/EditAdventure";
import EditCountriesList from "./pages/EditCountriesList";
function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visited_countries" element={<HomePage />} />
        <Route path="/adventures" element={<AllAdventures />} />
        <Route path="/adventures/:id" element={<SingleAdventure />} />
        <Route path="/adventures/edit/:id" element={<EditAdventure />} />
        <Route path="/adventure/new" element={<AddNewAdventure />} />
        <Route path="/visited_countries/edit" element={<EditCountriesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
