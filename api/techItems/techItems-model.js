const db = require('./../data/db-config')

function find() {
    return db("tech_items")
    .select(
      "tech_item_id",
      "tech_item_title",
      "tech_item_description",
      "tech_item_price",
      "min_rental_period",
      "max_rental_period",
      "category_id",
      "owner_id"
      ).orderBy("tech_item_id");
  }

function findBy(filter){
    return db("tech_items").where(filter).orderBy("tech_item_id")
}

function findById(id) {
    return db("tech_items").where("tech_item_id", id).first();
  }

async function add(tech_item) {
    const [tech_item_id] = await db("tech_items").insert(tech_item, "tech_item_id");
    return findById(tech_item_id);
}


async function update(id, changes){
    await db("tech_items").where("tech_item_id", id).update(changes)
    return findById(id)
}

async function remove(id){
    const deleted = await findById(id)
    await db("tech_items")
        .where("tech_item_id", id)
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