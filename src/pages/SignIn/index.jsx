import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import './style.css';
import HeaderLogo from "../../components/Logo";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  async function handleSignIn(event) {
    event.preventDefault();

    if (!form.email || !form.password) {
      return toast.info("E-mail e senha obrigatórios.")
    }
    const id = toast.loading("Por Favor, aguarde...");
    try {
      const response = await api.post("/users/login", {
        email: form.email, // "updaterpro_teste@market.com",
        password: form.password // "teste123456"
      })

      localStorage.setItem('token', response.data.user.token);
      toast.update(id, { render: "Seja Bem-vindo Usuário de Teste!", type: "success", isLoading: false, autoClose: 3000 });
      navigate("/main");
    } catch (error) {
      if (error.response) {
        return toast.update(id, { render: error.response.data.mensagem, type: "info", isLoading: false, autoClose: 3000 });
      }

      toast.update(id, { render: "Erro interno do servido. Tente novamente.", type: "error", isLoading: false, autoClose: 3000 });
    }
  }

  function handleChangeInput(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/main")
    }
  }, []);

  return (
    <main className='main-sign-in'>
      <HeaderLogo />
      <div className="container-form-sign-in">
        <form onSubmit={handleSignIn} className='form-sign-in'>
          <h2>Login</h2>
          <input type="email" name="email" value={form.email} placeholder='E-mail' onChange={handleChangeInput} />
          <input type="password" name="password" value={form.password} placeholder='Senha' onChange={handleChangeInput} />
          <button>ENTRAR</button>
        </form>
      </div>
    </main>
  )
}

export default SignIn;