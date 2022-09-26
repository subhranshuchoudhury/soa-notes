import './App.css';
import ls from 'local-storage';
import { useState, useEffect } from 'react';
import './form.css'
import axios from 'axios';
import MaterialCard from './components/MaterialCard';
function App() {

  const [inputs, setInputs] = useState({ username: "", section: "" });
  const [willFormShow, setWillFormShow] = useState(`${ls("formWillShow")}`);
  const [Materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const LoadMaterials = async () => {
    try {
      const { data } = await axios.get('https://api.npoint.io/95f58074abe4bc9c9a7b');
      setMaterials(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    LoadMaterials();
  }, []);


  const formName = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const formSection = (value) => {
    setInputs(values => ({ ...values, section: value }))
  }

  const handleSubmit = () => {

    if (inputs.username === "") {
      alert("Name filed can't be empty!");
      return;
    }
    ls("username", inputs.username);
    ls("section", inputs.section);
    ls("formWillShow", false);
    window.location.reload();
    // save the data locally.
  }

  const userReset = () => {
    ls.clear();
    alert("Local storage cleared!");
    window.location.reload();
  }





  return <>

    <nav className="navbar navbar-transparent navbar-expand-lg  sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><div className='pageTitle'>SOA NOTES</div></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button onClick={() => userReset()} style={{ color: "white", padding: "5px" }} className="nav-link active btn btn-danger" aria-current="page"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg> Reset User! </button>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Features</a> */}
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Pricing</a> */}
            </li>
            <li className="nav-item">
              {/* <a className="nav-link disabled">Disabled</a> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {
      ls("formWillShow") === false ? null : <div className='formHolder'>
        <div className='formTitle'><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-emoji-sunglasses" viewBox="0 0 16 16">
          <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z" />
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z" />
        </svg> Welcome!</div>
        <div className="mb-3">
          <label className="form-label"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
          </svg> What is your name ?</label>
          <input className="form-control" type="text"
            name="username"
            value={inputs.username || ""}
            onChange={formName}></input>
          <div className="form-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
          </svg> This is only for one time. All the data will store locally.</div>
        </div>
        <div className="mb-3">
          <label className="form-label"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
          </svg> What is your section ?</label>
          <br></br>
          <div className="btn-group">
            <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Section: {inputs.section || "All"}
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => formSection("")}>All</button></li>
              <li><button className="dropdown-item" onClick={() => formSection("A")}>A</button></li>
              <li><button className="dropdown-item" onClick={() => formSection("B")}>B</button></li>
              <li><button className="dropdown-item" onClick={() => formSection("C")}>C</button></li>
              <li><button className="dropdown-item" onClick={() => formSection("D")}>D</button></li>
              <li><button className='dropdown-item' onClick={() => formSection("E")}>E</button></li>
              <li><button className='dropdown-item' onClick={() => formSection("F")}>F</button></li>
              <li><button className='dropdown-item' onClick={() => formSection("G")}>G</button></li>
              <li><button className='dropdown-item' onClick={() => formSection("H")}>H</button></li>
              <li><button className='dropdown-item' onClick={() => formSection("I")}>I</button></li>
              <li><button className='dropdown-item' onClick={() => formSection("J")}>J</button></li>
              <li><button className='dropdown-item' onClick={() => formSection("K")}>K</button></li>
              <li><button className='dropdown-item' onClick={() => formSection("L")}>L</button></li>


            </ul>
          </div>
        </div>
        <div className='submitBtn'>
          <button type="button" className="btn btn-primary" onClick={() => handleSubmit()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
          </svg> Save</button>
        </div>
      </div>
    }

    {
      isLoading ? <div className='d-flex justify-content-center'>
        <div class="spinner-grow text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div> : null
    }



    {
      willFormShow !== "null" && !isLoading ? <MaterialCard Materials={Materials} Name={ls("username")} Section={ls("section")} /> : null
    }

  </>;
}

export default App;
