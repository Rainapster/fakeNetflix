import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { Movies } from "./pages/Movies";
import { Series } from "./pages/Series";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="movies" element={<Movies/>} />
          <Route path= "series" element={<Series/>} />
          <Route path="detail/:id" element={<MovieDetail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
