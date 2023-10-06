import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';

function SignIn() {
  const navigate = useNavigate()

  async function handleSignIn() {
    event.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email: "updaterpro_teste@market.com",
        password: "teste123456"
      })

      console.log(response.data);
      navigate("/main");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.mensagem);
        return
      }
      console.log("Erro do servidor, tente novamente");
    }
  }

  return (
    <main className='main-sign-in'>
      <div className='content-logo-title'>
        <img src={Logo} alt="" />
        <h1>Market Updater Pro</h1>
      </div>
      <div className="container-form-sign-in">
        <form onSubmit={() => handleSignIn()} className='form-sign-in'>
          <h2>Login</h2>
          <input type="email" name="email" placeholder='E-mail' />
          <input type="password" name="password" placeholder='Senha' />
          <button>ENTRAR</button>
        </form>
      </div>
    </main>
  )
}

export default SignIn;