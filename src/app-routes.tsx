import {Route, Routes} from "react-router-dom";
import {ROUTE} from "./common/routes";

import React from "react";
import Homepage from "./screens/homepage/Homepage";

function AppRoutes() {
    return (
        <Routes>
            <Route
                path={ROUTE.home}
                element={<Homepage/>}>
            </Route>
        </Routes>
    );
}

export default AppRoutes;