const _ = require("koa-route");
const Koa = require("koa");
const app = new Koa();

const db = [
  { id: 1, name: "tobi", species: "ferret" },
  { id: 2, name: "loki", species: "ferret" },
  { id: 3, name: "jane", species: "ferret" },
];

const pets = {
  query: (ctx) => {
    console.log(`Hitting: pets/${ctx.query.query}`);
    ctx.set("Cache-Control", "max-age=60");
    ctx.body = db
      .filter((x) => x.name.includes(ctx.query.query))
      .map((x) => x.id);
  },
  byId: (ctx, id) => {
    console.error(`Hitting: byId/${id}`);
    ctx.set("Cache-Control", "max-age=60");
    const pet = db.find((x) => x.id == id);
    if (!pet) return ctx.throw("cannot find that pet", 404);
    ctx.body = pet;
  },
  byIds: (ctx, idsString) => {
    console.error(`Hitting: byIds/${idsString}`);
    ctx.set("Cache-Control", "max-age=5");
    const ids = idsString.split(",").map((x) => parseInt(x, 10));
    const pets = db.filter((x) => ids.includes(x.id));
    ctx.body = pets;
  },
};
app.use(_.get("/pets", pets.query));
app.use(_.get("/pet/:id", pets.byId));
app.use(_.get("/pets/:idsString", pets.byIds));

app.listen(3000);
console.log("listening on port 3000");
