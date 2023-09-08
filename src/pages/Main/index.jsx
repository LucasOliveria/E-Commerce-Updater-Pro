import { useRef, useState } from 'react'
import Logo from '../../assets/logo.svg'
import Upload from '../../assets/uploading.gif'
import FormUpload from '../../components/FormUpload'
import api from '../../services/api'
import './style.css'

function Main() {
  const [file, setFile] = useState('');
  const fileInputRef = useRef(null);

  async function handleUploadFormData() {
    if (!file) {
      return console.log("Insira um arquivo CSV");
    }

    const formData = new FormData();

    formData.append('csv', file);

    try {
      const response = await api.post('/file', formData, {
        headers: {
          "Content-Type": "multpart/form-data"
        }
      })

      console.log(response.data);
      setFile('')

      if (fileInputRef.current) {
        fileInputRef.current.value = null
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.mensagem);
    }
  }
  console.log(file);
  return (
    <div className='container-main'>
      <div className='container-uploader'>
        <div className='content-logo-title'>
          <img src={Logo} alt="" />
          <h1>Market Updater Pro</h1>
        </div>
        <div className='container-insert-file'>
          <FormUpload fileInputRef={fileInputRef} setFile={setFile} />
        </div>

        <div className='container-file'>
          {file ? <h4>Arquivo: {file.name}</h4> : <h4>Nenhum arquivo selecionado</h4>}
        </div>

        <button onClick={handleUploadFormData}>VERIFICAR</button>
      </div>
      <div className='container-image'>
        <img src={Upload} alt="image upload" />
      </div>
    </div>
  )
}

export default Main
