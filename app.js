require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

app.get("/pokemons", async (request, response) => {
    const result = await pool.query("SELECT * FROM pokemons ORDER BY id");
    response.json(result.rows);
});

app.get("/pokemons/:id", async (request, response) => {
    const id = request.params.id;
    const result = await pool.query("SELECT * FROM pokemons WHERE id=$1", [id]);
    response.json(result.rows[0]);
});

app.post("/pokemons", async (request, response) => {
    const { nome, peso, ataque, defesa, velocidade, habilidade1, habilidade2 } = request.body;
    const result = await pool.query("INSERT INTO pokemons (nome, peso, ataque, defesa, velocidade, habilidade1, habilidade2) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", [nome, peso, ataque, defesa, velocidade, habilidade1, habilidade2]);
    response.json(result.rows[0]);
});

app.put("/pokemons/:id", async (request, response) => {
    const id = request.params.id;
    const { nome, peso, ataque, defesa, velocidade, habilidade1, habilidade2 } = request.body;
    const result = await pool.query("UPDATE pokemons SET nome=$1, peso=$2, ataque=$3, defesa=$4, velocidade=$5, habilidade1=$6, habilidade2=$7 WHERE id=$8 RETURNING *", [nome, peso, ataque, defesa, velocidade, habilidade1, habilidade2, id]);
    response.json(result.rows[0]);
});

app.delete("/pokemons/:id", async (request, response) => {
    const id = request.params.id;
    const result = await pool.query("DELETE FROM pokemons WHERE id=$1", [id]);
    response.json(result.rows);
});

app.listen(80, () => {
    console.log("Server is running on port 80");
});