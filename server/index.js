const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let collection;

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('pessoasDB');
    collection = db.collection('pessoas');

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectDB();

app.use(express.json()); 


app.post('/pessoas', async (req, res) => {
  try {
    const novoRegistro = req.body;

    const result = await collection.insertOne(novoRegistro)
    
    res.status(201).json({ message: 'Pessoa criada com sucesso', matriculaId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar pessoa', error: err });
  }
});

app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await collection.find().toArray()
    res.status(200).json(pessoas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pessoa', error: err });
  }
});

const { ObjectId } = require('mongodb');

app.get('/pessoas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

    const pessoa = await collection.findOne({ _id: newId })

    if (!pessoa) {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    } else {
      res.status(200).json(pessoa);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pessoa', error: err });
  }
});

app.put('/pessoas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);
    const atualizacao = req.body;

    const result = await collection.updateOne( { _id: newId }, { $set: atualizacao })
    //complete o código

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    } else {
      res.status(200).json({ message: 'Registro atualizado com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar registro', error: err });
  }
});

app.delete('/pessoas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

    const result = await collection.deleteOne({ _id: newId })

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    } else {
      res.status(200).json({ message: 'Registro excluído com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir registro', error: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
