const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    letNumNomes = data.nome.split(" ").length;
    if(numNome < 2) {
        return res.json({msg:"Nome incompleto"}).status(500).end;
    }

    data.cpf = data.cpf.replace(".", "");
    data.cpf = data.cpf.replace(".", "");
    data.cpf = data.cpf.replace("-", "");

    if (data.cpf.length !== 11) {
        return res.status(400).json({ message: "CPF deve conter 11 números" });
    }

    data.email = data.email.toLowerCase();

    if (!data.email.includes("@") || !data.email.includes(".")) {
        return res.status(400).json({ message: "Email inválido" });
    }

    const emailExiste = await prisma.clientes.findFirst({
        where: { email: data.email }
    });

    if (emailExiste) {
        return res.status(400).json({ message: "Email já cadastrado" });
    }

    let cnhSplit = data.cnh.split("");

    if (isNaN(Number(cnhSplit[0]))) {
        return res.status(400).json({ message: "CNH deve começar com número" });
    }

    const item = await prisma.clientes.create({
        data
    });

    return res.status(201).json(item);
};

const listar = async (req, res) => {
    const lista = await prisma.clientes.findMany();
    res.status(200).json(lista);
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.clientes.findUnique({
        where: { id: Number(id) },
        include: { carros: true }
    });

    res.status(200).json(item);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.clientes.update({
        where: { id: Number(id) },
        data: dados
    });

    res.status(200).json(item);
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.clientes.delete({
        where: { id: Number(id) }
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