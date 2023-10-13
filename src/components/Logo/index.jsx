import Logo from '../../assets/logo.svg';
import './style.css';

function HeaderLogo() {
  return (
    <div className='content-logo-title'>
      <img src={Logo} alt="" />
      <h1>Market Updater Pro</h1>
    </div>
  )
}

export default HeaderLogo;