import { useState } from 'react';
import '../globals.css';
import { useNavigate } from 'react-router-dom';


export default function CreatePessoa() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [nomePai, setNomePai] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [cpf, setCpf] = useState()

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoRegistro = { nome, dataNascimento, nomePai, nomeMae, cpf };
    console.log(novoRegistro)

    try {
      const response = await fetch('http://localhost:5000/matriculas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoRegistro),
      });

      if (response.ok) {
        alert('Pessoas registrada com sucesso!');
        setNome('');
        setDataNascimento('');
        setNomePai('');
        navigate("/pessoas");
      } else {
        alert('Erro ao registrar.');
      }
      
    } catch (error) {
      console.error('Erro ao criar registro:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Registrar Pessoa</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="date"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome do Pai"
        value={nomePai}
        onChange={(e) => setNomePai(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome da Mãe"
        value={nomeMae}
        onChange={(e) => setNomeMae(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder='CPF'
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        required
      >
      </input>
      <button type="submit">Registar</button>
    </form>
    </div>
  );
}
