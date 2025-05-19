import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((planet) => {
    return planet.id == id;
  });
  if (planet) {
    res.status(200).json(planet);
  } else {
    res.status(404).send("planet not found");
  }
});

app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const newPlanet = {
    id,
    name,
  };
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "planet was created" });
});

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id == id ? { ...p, name } : p));
  res.status(200).send({ msg: "Planet was updated" });
});

app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id != id);
  res.status(200).json({ msg: "Planet was deleted" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
