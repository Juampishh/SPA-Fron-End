
import {
    Navbar,
    NavbarBrand,
    NavbarContainer,
    NavbarItem,
    NavbarList,
  } from 'keep-react'
  
  export const NavbarComponent = () => {
    return (
      <Navbar className='w-full'>
        <NavbarContainer>
            <NavbarBrand className='w-full p-2 font-semibold'><h1>Sentirse bien</h1></NavbarBrand>
          <NavbarList className='flex justify-end w-full'>
            <NavbarItem>Servicios</NavbarItem>
            <NavbarItem>Contacto</NavbarItem>
            <NavbarItem >Login</NavbarItem>
          </NavbarList>
    
        </NavbarContainer>
      </Navbar>
    )
  }
  
  