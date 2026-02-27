const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    let placa = data.placa.trim().replace("-", "").replace(" ", "").toUpperCase();
    if(placa.lenght != 7) {
        return res.json({msg:"Placa incorreta"}).status(500).end();
    }
    data.placa = placa;

    data.marca = data.marca.trim();

    if(!data.marcamodelo) {
        return res.json().status(500).end();
    }

    let infoCarro = data.marcamodelo.toLowerCase().split(" ");
    data.marca = infoCarro[0];
    data.modelo = infoCarro[1];

    if (!data.ano) {
        return res.status(400).json({ msg: "Ano obrigatório" });
    }

    let ano = data.ano.toString();

    if (ano.length !== 4) {
        return res.status(400).json({ msg: "Ano deve ter 4 dígitos" });
    }

    let caracteres = ano.split("");

    for (let i = 0; i < caracteres.length; i++) {
        if (isNaN(caracteres[i])) {
            return res.status(400).json({ msg: "Ano não pode conter letras" });
        }
    }

    data.ano = ano;

    const item = await prisma.carros.create({
        data
    });

    return res.status(201).json(item);
};

    const item = await prisma.carros.create({
        data
    });

    return res.status(201).json(item);

    const listar = async (req, res) => {
    const lista = await prisma.carros.findMany();
    res.status(200).json(lista);
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.carros.findUnique({
        where: { id },
        include: { clientes: true }
    });

    res.status(200).json(item);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.carros.update({
        where: { id },
        data: dados
    });

    res.status(200).json(item);
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.carros.delete({
        where: { id }
    });

    res.status(200).json(item);
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};