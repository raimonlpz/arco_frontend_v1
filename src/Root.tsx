
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Auth/Login/Login";
import { SignupPage } from "./Auth/Signup/Signup";
import { AuthService } from "./Auth/_services_";
import { SearchPage } from "./Browser/Search/Search";
import { CategoriesPage } from "./Categories/Categories";
import { ActivityPage } from "./Feed/Activity";
import Header from "./Shared/Header/Header";
import NotFoundPage from "./Shared/NotFound/NotFound";
import { LocalStorage } from "./Shared/_services_";
import { pages } from "./Shared/_utils_/routes";
import { darkTheme } from "./Shared/_utils_/theme";


const Root = () => {

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (token) {
      const auth = new AuthService();
      auth.session(token).then((res) => {
        const I = auth.resolveInterface(res);
        switch (I) {
          case 'SessionResponse': 
            console.log('SessionResponse', res)
            break;
          case 'AuthError':
          case 'Error':
            break;
        }
      });
    }
  }, [])

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
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </Router>
      </NextUIProvider>
    </>
  )
}

export default Root;
