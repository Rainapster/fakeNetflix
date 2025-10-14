import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { Movies } from "./pages/Movies";
import { Series } from "./pages/Series";
import MovieDetail from "./pages/MovieDetail";
import { HomeComponent } from "./pages/HomeComponent";
import PageNotFound from "./components/pageNotFound/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComponent />} />
          <Route path="movies" element={<Movies />} />
          <Route path="series" element={<Series />} />
          <Route path="detail/:id" element={<MovieDetail />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
