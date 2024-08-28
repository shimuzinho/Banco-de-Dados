import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import CreatePessoa from './CriarRegistro'
import ReadPessoas from './ListarPessoas'
import UpdatePessoa from './AlterarPessoa'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
            <Routes>
                  <Route path="/" element={ <Home/> }/>
                  <Route path="/pessoas/cadastrar" element={ <CreatePessoa/> }/>
                  <Route path="/pessoas" element={ <ReadPessoas/> }/>
                  <Route path="/pessoas/alterar" element={ <UpdatePessoa/>}/>
            </Routes> 
      </BrowserRouter>
  </React.StrictMode>,
)



