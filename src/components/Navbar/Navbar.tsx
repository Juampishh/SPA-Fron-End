
import {
    Navbar,
    NavbarBrand,
    NavbarContainer,
    NavbarItem,
    NavbarList,
  } from 'keep-react'
import { useUsuario } from '../../Context/usuarioContex';  
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
  export const NavbarComponent = () => {
    const { usuario } = useUsuario();
    const navigate = useNavigate();
    const Logout = () => {
      localStorage.removeItem('usuario');
      navigate('/');
      toast.success('Sesion cerrada');
    }
    return (
      <Navbar className='w-full'>
        <NavbarContainer>
            <NavbarBrand className='w-full p-2 font-semibold'><h1>Sentirse bien</h1></NavbarBrand>
          <NavbarList className='flex justify-end w-full'>
            <NavbarItem>Servicios</NavbarItem>
            <NavbarItem>Contacto</NavbarItem>
            {usuario && (
              <NavbarItem className='cursor-pointer hover:text-Verde' onClick={Logout} >Cerrar sesion</NavbarItem>
            )}
            {!usuario && (
              <NavbarItem >Login</NavbarItem>
            )}
          </NavbarList>
    
        </NavbarContainer>
      </Navbar>
    )
  }
  
  