import express from "express";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video");

const dbSetup = async () => {
  await db.none(`
DROP TABLE IF EXISTS planets;
CREATE TABLE planets(
id SERIAL NOT NULL PRIMARY KEY,
name TEXT NOT NULL
);
`);
  await db.none(`
    INSERT INTO planets (name) 
    VALUES
    ('Earth')
    `);
  await db.none(`
    INSERT INTO planets (name) 
    VALUES
    ('Mars')
    `);

  const planets = await db.many(`SELECT * FROM planets`);
  console.log(planets);
};
dbSetup();

const app = express();
const port = 3000;

app.use(express.json());

const getAll = async (req, res) => {
  const planets = await db.many(`SELECT * FROM planets`);
  res.status(200).json(planets);
};
const getOneById = async (req, res) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id = $1`, [
    id,
  ]);

  if (planet) {
    res.status(200).json(planet);
  } else {
    res.status(404).send("planet not found");
  }
};
const create = async (req, res) => {
  const { name } = req.body;
  await db.none(
    `INSERT INTO planets (name)
    VALUES
    ($1)
    `,
    name
  );
  res.status(201).json({ msg: "planet was created" });
};
const updateById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);
  res.status(200).send({ msg: "Planet was updated" });
};
const deleteById = (req, res) => {
  const { id } = req.params;
  db.none(`DELETE FROM planets WHERE id=$1`, [id]);
  res.status(200).json({ msg: "Planet was deleted" });
};

export { getAll, getOneById, create, updateById, deleteById };
