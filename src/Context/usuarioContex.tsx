import React, { useEffect, useMemo, useState, ReactNode } from "react";

export type Usuario = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: string;
};

// Define el tipo del contexto con funciones de actualización de estado
type UsuarioContextType = {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const UsuarioContext = React.createContext<UsuarioContextType | undefined>(
  undefined
);

type UsuarioProviderProps = {
  children: ReactNode;
};

export function UsuarioProvider({ children }: UsuarioProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
  const [loading, setLoading] = useState(false);
  const ls = localStorage.getItem("usuario");

  useEffect(() => {
    if (ls) {
      setUsuario(JSON.parse(ls));
    }
  }, [ls]);

  const value = useMemo(() => {
    return {
      usuario,
      setUsuario,
      loading,
      setLoading,
    };
  }, [usuario, loading]);

  return (
    <UsuarioContext.Provider value={value}>{children}</UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = React.useContext(UsuarioContext);
  if (context === undefined) {
    throw new Error("useUsuario must be used within a UsuarioProvider");
  }
  return context;
}
