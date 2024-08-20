import React, { useEffect, useMemo, useState } from "react";
type Usuario = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: string;
};

const UsuarioContext = React.createContext({
  usuario: {} as Usuario,
  setUsuario: () => {},
  loading: false,
  setLoading: () => {},
});

export function UsuarioProvider(props: any) {
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(false);
  const ls = localStorage.getItem("usuario");

  useEffect(() => {
    if (ls) {
      setUsuario(JSON.parse(ls));
    }
  }, []);

  const value = useMemo(() => {
    return {
      usuario,
      setUsuario,
      loading,
      setLoading,
    };
  }, [usuario, loading]);
  return <UsuarioContext.Provider value={value} {...props} />;
}

export function useUsuario() {
  const context = React.useContext(UsuarioContext);
  if (!context) {
    throw new Error("Error en el hook useUsuario");
  }
  return context;
}
