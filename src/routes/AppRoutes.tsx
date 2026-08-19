import { Routes, Route } from "react-router"
import { Home } from "../pages/Home"
import { Products } from "../pages/Products";
import GuessWord from "../pages/GuessWord"
import { NotFound } from "../pages/NotFound";
import { About } from "../pages/About";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" index element={<Home />} />\
            <Route path="/products" element={<Products />} />
            <Route path="/guessword" element={<GuessWord />} />
            <Route path="/about" element={<About />} />


            <Route path="/*" element={<NotFound />} />

        </Routes>
    )
}