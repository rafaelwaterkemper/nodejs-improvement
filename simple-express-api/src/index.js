const express = require("express");
const crypto = require("crypto");

const app = express();

const customers = [];

app.use(express.json())

function verifyIfCustomerExists(req, res, next) {
    const { cpf } = req.headers;
    const customerSelected = customers.find(customer => customer.cpf === cpf);
    
    if (!customerSelected) {
        return res.status(404).json({error: "Customer not exists!"});
    }
    req.customer = customerSelected;
    next();
}

function getBalance(statement) {
    return statement.reduce((acc, operation)  => {
        if (operation.type == "credit") {
            return acc + operation.amount;
        }

        return acc - operation.amount;
    }, 0);
}

app.post("/account", (req, res) => {
    const { name, cpf, statement } = req.body;
    const uuid = crypto.randomUUID();
    console.log(statement)
    const alreadyExists = customers.some(customer => customer.cpf === cpf);

    if (alreadyExists) {
        return res.status(409).json({error: "Customer already exists!"})
    }
    customers.push({
        uuid,
        name,
        cpf,
        statement: []
    });

    return res.status(201).send();
})


app.get("/statement", verifyIfCustomerExists, (req, res) => {
    const { customer } = req;
    return res.json(customer.statement);
})

app.post("/deposit", verifyIfCustomerExists, (req, res) => {
    const { customer } = req;
    const { description, amount, type } = req.body;
    customer.statement.push({
        description,
        amount,
        type,
        createdAt: new Date()
    });
    return res.json(customer);
})

app.post("/withdraw", verifyIfCustomerExists, (req, res) => {
    const { amount } = req.body;
    const { customer } = req;
    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return res.status(422).json({error: "Insufficient funds!"})
    }

    const statementOperation = {
        amount,
        createdAt: new Date(),
        type: "debit"
    }

    customer.statement.push(statementOperation);
    return res.status(201).send();
})

app.get("/balance", verifyIfCustomerExists, (req, res) => {
    const { customer }  = req;
    const { date } = req.query;

    const filter = new Date(date + " 00:00");

    const statements = customer.statement.filter(statement => 
        statement.createdAt.toDateString() === filter.toDateString()
    )

    return res.json(statements);
})

app.listen(3000, () => console.log("App started"))