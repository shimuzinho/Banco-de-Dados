import { Link } from 'react-router-dom';
import '../globals.css';

export default function Home() {
    return (
        <div className='container'>
            <h2>Base de Registros</h2>
            <div className="card-container">
                <Link to="/pessoas/cadastrar" className="card">
                    <div>Registrar Pessoa</div>
                </Link>
                <Link to="/pessoas" className="card">
                    <div>Lista de Pessoa</div>
                </Link>
                <Link to="/pessoas/alterar" className="card">
                    <div>Editar Registros</div>
                </Link>
            </div>
        </div>
    );
}
