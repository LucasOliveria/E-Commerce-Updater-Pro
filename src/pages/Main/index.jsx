import { useRef, useState } from 'react'
import { toast } from "react-toastify"
import Cloud from '../../assets/cloud.gif'
import Logo from '../../assets/logo.svg'
import Upload from '../../assets/Uploading.gif'
import FileBox from '../../components/FileBox'
import FormUpload from '../../components/FormUpload'
import api from '../../services/api'
import './style.css'

function Main() {
  const [file, setFile] = useState('');
  const [products, setProducts] = useState([]);
  const fileInputRef = useRef(null);
  const targetContainerFileRef = useRef(null);
  const targetContainerSetRef = useRef(null);

  async function handleUploadFormData() {
    if (!file) {
      return toast.info("Insira um arquivo CSV");
    }

    const formData = new FormData();

    formData.append('csv', file);
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
    } catch (error) {
      toast.info(error.response.data.mensagem);
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
    try {
      const response = await api.patch('/products', formData, {
        headers: {
          "Content-Type": "multpart/form-data"
        }
      })

      setProducts([]);
      setFile('');
      window.scrollTo({ top: targetContainerSetRef.current.offsetTop, behavior: 'smooth' });
      toast.success(response.data.mensagem);
    } catch (error) {
      toast.info(error.response.data.mensagem);
    }
  }

  return (
    <main>
      <div ref={targetContainerSetRef} className='container-set'>
        <div className='container-uploader'>
          <div className='content-logo-title'>
            <img src={Logo} alt="" />
            <h1>Market Updater Pro</h1>
          </div>
          <div className='container-insert-file'>
            <FormUpload fileInputRef={fileInputRef} setFile={setFile} />
          </div>
          <div className='container-file-name'>
            {file ? <h4>Arquivo: {file.name}</h4> : <h4>Nenhum arquivo selecionado</h4>}
          </div>
          <button onClick={handleUploadFormData}>VERIFICAR</button>
        </div>
        <div className='container-image'>
          <img src={Upload} alt="image upload" />
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