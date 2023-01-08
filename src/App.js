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
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Adventures/" element={<HomePage />} />
        <Route path="/Adventures/visited_countries" element={<HomePage />} />
        <Route path="/Adventures/all" element={<AllAdventures />} />
        <Route path="/Adventures/:id" element={<SingleAdventure />} />
        <Route path="/Adventures/edit/:id" element={<EditAdventure />} />
        <Route path="/Adventures/new" element={<AddNewAdventure />} />
        <Route
          path="./visited_countries/edit"
          element={<EditCountriesList />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
