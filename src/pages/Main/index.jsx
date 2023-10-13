import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import Upload from '../../assets/Uploading.gif'
import Cloud from '../../assets/cloud.gif'
import Exit from '../../assets/exit.svg'
import FileBox from '../../components/FileBox'
import FormUpload from '../../components/FormUpload'
import HeaderLogo from '../../components/Logo'
import api from '../../services/api'
import './style.css'

function Main() {
  const [file, setFile] = useState('');
  const [products, setProducts] = useState([]);
  const fileInputRef = useRef(null);
  const targetContainerFileRef = useRef(null);
  const targetContainerSetRef = useRef(null);
  const navigate = useNavigate()

  async function handleUploadFormData() {
    if (!file) {
      return toast.info("Insira um arquivo CSV");
    }

    const formData = new FormData();

    formData.append('csv', file);

    const id = toast.loading("Lendo o arquivo...");
    try {
      const response = await api.post('/file', formData, {
        headers: {
          "Content-Type": "multpart/form-data"
        }
      })

      setProducts(response.data);
      window.scrollTo({ top: targetContainerFileRef.current.offsetTop, behavior: 'smooth' });
      if (fileInputRef.current) {
        fileInputRef.current.value = null
      }

      toast.update(id, { render: "Tudo pronto", type: "success", isLoading: false, autoClose: 3000 });
    } catch (error) {
      if (error.response) {
        return toast.update(id, { render: error.response.data.mensagem, type: "info", isLoading: false, autoClose: 3000 });
      }

      toast.update(id, { render: "Erro interno do servido. Insira o arquivo e tente novamente.", type: "error", isLoading: false, autoClose: 3000 });
    }
  }

  async function handleUpdate() {
    for (const product of products) {
      if (product.broken_rules.length) {
        toast.info('Resolva as regras do arquivo CSV e reenvie para nova verificação');
        return;
      }
    }

    const formData = new FormData();

    formData.append('csv', file);

    const id = toast.loading("Enviando o arquivo...");
    try {
      const response = await api.patch('/products', formData, {
        headers: {
          "Content-Type": "multpart/form-data"
        }
      })

      setProducts([]);
      setFile('');
      window.scrollTo({ top: targetContainerSetRef.current.offsetTop, behavior: 'smooth' });
      toast.update(id, { render: response.data.mensagem, type: "success", isLoading: false, autoClose: 3000 });
    } catch (error) {
      toast.update(id, { render: error.response.data.mensagem, type: "info", isLoading: false, autoClose: 3000 });
    }
  }

  function handleExit() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <main>
      <div ref={targetContainerSetRef} className='container-set'>
        <div className='container-uploader'>
          <HeaderLogo />
          <div className='container-insert-file'>
            <FormUpload fileInputRef={fileInputRef} setFile={setFile} />
          </div>
          <div className='container-file-name'>
            {file ? <h4>Arquivo: {file.name}</h4> : <h4>Nenhum arquivo selecionado</h4>}
          </div>
          <button onClick={handleUploadFormData}>VERIFICAR</button>
        </div>
        <div className='container-image'>
          <img src={Exit} alt="Exit" onClick={handleExit} />
          <img src={Upload} alt="Image-upload" />
        </div>
      </div>
      <div ref={targetContainerFileRef} className='container-file'>
        {products.length ?
          <div className='content-file'>
            {products.map((product) => (
              <FileBox key={product.product_code} product={product} />
            ))}
          </div>
          :
          <div className='content-not-file'>
            <img src={Cloud} alt="Cloud" />
          </div>
        }
        {products.length ? <button onClick={handleUpdate}>ATUALIZAR</button> : ""}
      </div>
    </main>
  )
}

export default Main;