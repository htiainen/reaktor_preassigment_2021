import { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

const Product = (props) => {
  const {id, name, color, price, manufacturer, availability} = props.product;
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{manufacturer}</td>
      <td>{color}</td>
      <td>{availability}</td>
      <td>{price}</td>
    </tr>
  )
}

const ProductTable = (props) => {
  return (
    <table>
      <tbody>
        {props.products.map(item => {
          return <Product product={item} />
        })}
      </tbody>
    </table>
  )
} 

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [productType, setProductType] = useState("gloves");

  useEffect(() => {
    fetch("http://localhost:8080/api/")
      .then(res => res.json()).then(response => {
        setData(response);
        setIsLoading(false);
      },
      e => {
        console.error(e)
      });
  }, []);

  return (
    <div>
      {!isLoading &&
          <>
            <nav>
              {data.map((item, index) => {
                const type = item[0].type;
                return <button key={index} onClick={() => {
                  setProductType(type);
                }}>{type}</button>
              })}
            </nav>
            <ProductTable products={data.find(item => item[0].type === productType)} />
          </>
      }
    </div>
    
  )
}

export default App;
