import { useState } from "react";
import './App.css';
import CryptoJS from "crypto-js";

function App() {

  const [inputs, setInputs] = useState({});
  const [result, setResult]  = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const  encryptData= (data, HASH,type = 'object')=> {
    return CryptoJS.AES.encrypt(JSON.stringify(data), HASH).toString();
  }
  
  const decryptData = (data, HASH,type = 'object')=> {
    let decodedData = '';
  
    try {
      const bytes = CryptoJS.AES.decrypt(data, HASH);
      decodedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (err) {
      decodedData = '';
    }
  
    return decodedData;
  }

  const handleSubmit = (event) => {
  event.preventDefault();
  console.log(inputs);

    if(!inputs.key || !inputs.inputText){
      alert('All Fileds Are Required');
    }else{
      if(inputs.method == 'Encrypt'){
        const enc = encryptData(inputs.inputText,inputs.key);
        // alert(enc);
        console.log(enc);
        setResult(enc);
      }else{
        const dec = decryptData(inputs.inputText,inputs.key);
        // alert(dec);
        console.log(dec);
        setResult(dec);
      }
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={handleSubmit}>
        <label>Enter Hask Key:
        <input type="text"  name="key" value={inputs.key} 
          onChange={handleChange}
        />
        </label><br></br> <br></br>
        <label>Enter Input :
        <textarea className="textarea-class" value={inputs.inputText} name="inputText" onChange={handleChange} />
          </label><br></br> <br></br>
          <label>Enter Method :
          <select value={inputs.method} name="method" onChange={handleChange} >
            <option value="Encrypt" selected>Encrypt</option>
            <option value="Decrypt">Decrypt</option>
          </select>  
          </label><br></br> <br></br>
        <input type="submit" />
      <div>{Object?.keys(result)?.length ? JSON.stringify(result):null }</div>
      </form>
      {/* <div><pre>{Object?.keys(result)?.length ? JSON.stringify(result):null }</pre></div> */}
      </header>
    </div>
  );
}

export default App;
