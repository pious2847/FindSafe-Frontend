/* eslint-disable react/no-unknown-property */
import * as React from "react";
import { useState } from 'react';
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
// import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

import { ModeToggle } from "../mode-toggle";
import { Button } from "@/components/ui/button";
import { CiMenuFries } from "react-icons/ci";
import { isAuthenticated, handleLogout } from "@/auth/auth";

import { useNavigate} from 'react-router-dom';

function AppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onLogoutClick = () => {
    handleLogout();
    navigate('/login')

  };
  return (
    <>
      <div className="appBar max-h-20 shadow-lg  fixed backdrop-blur-md z-[2]  w-full justify-between flex   align-middle p-5">
        <Link to='/'>
        <h4 className=" text-lg font-medium">FindSafe</h4>
        </Link>
        <div className= {`flex justify-between mobileNav ${isMenuOpen ? 'active' : ''} backdrop-blur-md  gap-32`}>
          <NavigationMenu className="nav-conent flex">
            <NavigationMenuList className="nav-conent flex">
              <NavigationMenuItem className="menubarin ">
                <NavigationMenuTrigger >Getting started</NavigationMenuTrigger>
                <NavigationMenuContent className='NavigationMenuContainer'>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] NavigationMenuContent">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <img src="vite.svg" alt="" className="h-20 w-20" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            FindSafe
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            FindSafe simplifies security and fast development with an
                            intuitive user interface, customizable themes, and
                            advanced SEO tools..
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      FindSafe: Your gateway to effortless mobile tracking and
                      management.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install App and set your app account.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Usage"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
                
              </NavigationMenuItem>
              <NavigationMenuItem className="menubarin">
                <a href="/docs">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem className="menubarin">
                <a href="/pricing">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem className="menubarin">
                <a href="/about">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <br />
          <div className="flex align-middle gap-5 ModeToggle ">
            <ModeToggle  id='modebtn' />
            {!isAuthenticated() ? 
              <Button>
              <Link to="/login" >
              Get Started - it’s Free
              </Link>   
            </Button>
            :
            <div className="flex align-middle gap-5">
               <Button>
              <Link to="/dashboard" className="sm: p-2 ">
              Dashboard
              </Link>   
            </Button>
            <div onClick={onLogoutClick}>
            <Button variant='danger' className="logoutbtn">
              Logout
            </Button>
            </div >
            </div>
           
           
            }
                   
            
          </div>
        </div>
        <div className={`menuicon   ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <CiMenuFries   size={25} fontWeight={900}/>
        </div>
      </div>
    </>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            href={href}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

ListItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default AppBar;
