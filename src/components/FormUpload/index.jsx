import './style.css';

function FormUpload({ setFile, fileInputRef }) {
  return (
    <form className='form-uploader'>
      <label htmlFor="file">Insira o arquivo CSV</label>
      <input type="file" name='filename' id="file" placeholder='Arquivo CSV' onChange={(event) => setFile(event.target.files[0])} ref={fileInputRef} />
    </form>
  )
}

export default FormUpload;