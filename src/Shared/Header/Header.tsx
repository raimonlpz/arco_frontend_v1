import { Navbar, Button, Link, Text, useTheme } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsChevronBarContract } from 'react-icons/bs';
import { pages } from "../_utils_/routes";


export default function Header() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

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
      </Navbar>
  )
}