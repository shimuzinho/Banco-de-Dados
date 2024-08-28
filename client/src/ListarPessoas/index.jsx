import { useEffect, useState } from 'react';
import '../globals.css';

export default function ReadPessoas() {
  const [pessoas, setPessoas] = useState([]);


  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await fetch('http://localhost:5000/matriculas');
        const data = await response.json();
        setPessoas(data);
      } catch (error) {
        console.error('Erro ao buscar as matrículas:', error);
      }
    };

    fetchPessoas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/matriculas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {

        setPessoas(pessoas.filter((el) => el._id !== id));
        alert('Pessoa excluída com sucesso!');
      } else {
        alert('Erro ao excluir pessoa.');
      }
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Lista de Pessoas</h2>
      <table  className="table-container" border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Nome do Pai</th>
            <th>Nome da Mãe</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((el) => (
            <tr key={el._id}>
              <td>{el._id}</td>
              <td>{el.nome}</td>
              <td>{el.dataNascimento}</td>
              <td>{el.nomePai}</td>
              <td>{el.nomeMae}</td>
              <td>{el.cpf}</td>
              <td>
                <button onClick={() => handleDelete(el._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
