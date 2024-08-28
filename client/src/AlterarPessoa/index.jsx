import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdatePessoa() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [nomePai, setNomePai] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [cpf, setCpf] = useState()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atualizacao = { nome, dataNascimento, nomePai, nomeMae, cpf };

    try {
      const response = await fetch(`http://localhost:5000/matriculas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atualizacao),
      });
      if (response.ok) {
        alert('Matrícula atualizada com sucesso!');
        navigate("/pessoas");
      } else {
        alert('Erro ao atualizar pessoa.');
      }
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Atualizar Matrícula</h2>
      <input
        type="text"
        placeholder="CPF da Pessoa"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
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
      <button type="submit">Atualizar Registro</button>
    </form>
    </div>
  );
}
