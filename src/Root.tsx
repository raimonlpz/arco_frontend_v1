
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Auth/Login/Login";
import { SignupPage } from "./Auth/Signup/Signup";
import { SearchPage } from "./Browser/Search/Search";
import { CategoriesPage } from "./Categories/Categories";
import { ActivityPage } from "./Feed/Activity";
import { ProfilePage } from "./Profile/Profile";
import Header from "./Shared/_ui_/Header/Header";
import NotFoundPage from "./Shared/_ui_/NotFound/NotFound";
import { useSession } from "./Shared/_hooks_";
import { pages } from "./Shared/_utils_/routes";
import { darkTheme } from "./Shared/_utils_/theme";


const Root = () => {
  // initialize Session with stored Token -it may be expired or inexistent-
  useSession();

  return (
    <>
      <NextUIProvider theme={darkTheme}>
        <Router>
          <Header />
          <Routes>
            <Route path={pages.root} element={<SearchPage />}></Route>
            <Route path={pages.search} element={<SearchPage />}></Route>
            <Route path={pages.categories} element={<CategoriesPage />}></Route>
            <Route path={pages.activity} element={<ActivityPage />}></Route>
            <Route path={pages.login} element={<LoginPage />}></Route>
            <Route path={pages.signup} element={<SignupPage />}></Route>
            <Route path={pages.profileMe} element={<ProfilePage />}></Route>
            <Route path={pages.profileUser} element={<ProfilePage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </Router>
      </NextUIProvider>
    </>
  )
}

export default Root;
