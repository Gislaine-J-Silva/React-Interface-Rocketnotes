import { createContext, useContext, useState, useEffect } from 'react'

import { api } from "../services/api";

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [data, setData] = useState({});
  
  async function signIn({ email, password }){
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));//converter o user em texto para ser salvo no navegador
      localStorage.setItem("@rocketnotes:token", token);//salvar o token no navegador

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;


      setData({ user, token })
    }catch (error){
      if(error.response){
        alert(error.response.data.message);
      }else {
        alert("Não foi possível entrar.")
      }
    }
  }

  function signOut(){
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    setData({});
  }

  async function updateProfile({ user, avatarFile }){
    try {
      if(avatarFile){
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({ user, token: data.token })
      alert("Perfil atualizado")

    } catch (error) {
      if(error.response){
        alert(error.response.data.message);
      }else {
        alert("Não foi possivel atualizar o perfil")
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if (token && user){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;



      setData({
        token,
        user : JSON.parse(user) //muda o conteudo salvo em tipo JSON para objeto novamente.
      })
    }

  }, []); 
  /* useEffect tem 2 parte:
    A primeira parte: é uma arrow function , que é o que vc quer que ele execute. Sempre vai executar após o carregamento/renderização do componente.
    A segunda parte: é um vetor que podemos colocar o estado que quiser. Quando o estado mudar ele dispara o useEffect novamente.
  */

  return (
    <AuthContext.Provider
      value={{ 
        signIn, 
        user: data.user,
        signOut, 
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
