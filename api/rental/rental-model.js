const db = require('./../data/db-config')

function find() {
    return db("rentals")
    .select(
      "rental_id",
      "rental_period",
      "renter_id",
      "owner_id",
      "tech_item_id"
      ).orderBy("rental_id");
  }

function findBy(filter){
    return db("rentals").where(filter).orderBy("rental_id")
}

function findById(id) {
    return db("rentals").where("rental_id", id).first();
  }

async function add(rental) {
    const [rental_id] = await db("rentals").insert(rental, "rental_id");
    return findById(rental_id);
}

async function update(id, changes){
    await db("rentals").where("rental_id", id).update(changes)
    return findById(id)
}

async function remove(id){
    const deleted = await findById(id)
    await db("rentals")
        .where("rental_id", id)
        .del()
    return deleted;
}

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}