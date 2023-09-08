import FileOk from '../../assets/file-ok.svg';
import FileX from '../../assets/file-x.svg';
import './style.css';

function FileBox({ product }) {
  return (
    <div className='file-line'>
      {!product.broken_rules.length ?
        <img src={FileOk} alt="file ok" /> :
        <img src={FileX} alt="file x" />
      }
      <div className='product-info-box'>
        <div className='name-code-box'>
          <h3>{product.name}</h3>
          <h3>Código: {product.product_code}</h3>
        </div>

        <p>Preço atual: <span className='sales-price-color'>{product.sales_price}</span></p>
        <p>Novo Preço: <span className='new-price-color'>{product.new_price}</span></p>
        {product.broken_rules.length ?
          <div className='broken-rules-box'>
            <p>Regras: <span className='broken-rules-color'>{product.broken_rules}</span></p>
          </div> : ""
        }
      </div>
    </div>
  )
}

export default FileBox;