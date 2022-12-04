import { Navbar, Button, Link, Text, useTheme, Avatar, Popover, Grid, Row, Spacer } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsChevronBarContract } from 'react-icons/bs';
import { pages } from "../_utils_/routes";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../Auth/_store_/auth";

import { IoMdLogOut } from 'react-icons/io';
import { LocalStorage } from "../_services_";


export default function Header() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSession, setActiveSession ] = useState(false);

  const [ removeSessionData ] = useAuthStore((state) => [
    state.removeSessionData,
  ]);

  useEffect(() => {
   useAuthStore.subscribe((s) => {
    if (s.access_token)
      setActiveSession(true);
    else 
      setActiveSession(false);
   });

    return () => {
      useAuthStore.destroy();
    }
  }, [])


  const handleLogout = (): void => {
    LocalStorage.removeToken();
    removeSessionData();
  }

  return (
      <Navbar isBordered={isDark} variant="floating" css={{position: "absolute"}}>
        <Navbar.Brand>
            <BsChevronBarContract size="40" />
            <Text size="10" css={{paddingLeft: ".5rem"}}>the blockchain explorer</Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline" >
          <Navbar.Link 
            isActive={location.pathname === pages.root || location.pathname === pages.search} 
            onClick={() => navigate('/search')}
          >
            Search
          </Navbar.Link>
          <Navbar.Link 
            isActive={location.pathname === pages.categories} 
            onClick={() => navigate('/categories')}
          >
            Categories
          </Navbar.Link>
          <Navbar.Link
            isActive={location.pathname === pages.activity} 
            onClick={() => navigate('/activity')}
          >
            Activity
          </Navbar.Link>
        </Navbar.Content>
        {
          activeSession && (
            <Navbar.Content>
              <Navbar.Item>
              <Popover>
                <Popover.Trigger>
                <Button css={{background: "none", overflow: "visible"}}>
                  <Avatar 
                      css={{cursor: "pointer"}}
                      onClick={() => {}}
                      color="gradient"
                      bordered
                      size="lg"
                      src="https://www.disneyplusinformer.com/wp-content/uploads/2022/03/Moon-Knight-Profile-Avatar.png" />
                </Button>
                </Popover.Trigger>
                <Popover.Content>
                <Grid.Container
                    css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
                >
                    <Row justify="center" align="center">
                        <Button size="sm" shadow color="error" onClick={handleLogout}>
                          <IoMdLogOut size="20" />
                          <Spacer />
                          Logout
                        </Button>
                    </Row>
                  </Grid.Container>
                </Popover.Content>
              </Popover>
              </Navbar.Item>
            </Navbar.Content>
          )
        }
        {
          !activeSession && (
            <Navbar.Content>
              <Navbar.Item isActive={location.pathname === pages.login}>
                <Button 
                  color={"primary"} 
                  auto 
                  flat={location.pathname !== pages.login} 
                  as={Link} 
                  onClick={() => navigate('/login')}
                >  
                  Login
                </Button>
              </Navbar.Item>
              <Navbar.Item isActive={location.pathname === pages.signup}>
                <Button
                  color={"primary"} 
                  auto 
                  flat={location.pathname !== pages.signup} 
                  as={Link} 
                  onClick={() => navigate('/signup')}
                >
                    Sign Up
                </Button>
              </Navbar.Item>
            </Navbar.Content>
          )
        }
      </Navbar>
  )
}