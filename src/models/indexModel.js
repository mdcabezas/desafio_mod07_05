const format = require('pg-format');
const { Pool } = require("pg");
const pool = new Pool({
  host: "192.168.1.66",
  user: "postgres",
  password: "miclavesecreta",
  database: "joyas",
  allowExitOnIdle: true
})

pool.connect((err, _) => err ? console.error("ERROR connect DB:", err) : console.log("OK connect DB"));

// Get all users
const getAllItems = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM inventario")
    return ({ rows, length: rows.length })
  } catch ({ code, message }) {
    return ({ code, message })
  }
};

const getPaginatedItems = async ({ limits = 3, order_by = "stock_ASC", page = 1 }) => {
  try {
    const [campo, direccion] = order_by.split("_")
    const offset = (page - 1) * limits
    const formattedQuery = format('SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
    pool.query(formattedQuery);
    const { rows: items } = await pool.query(formattedQuery)
    return items
  } catch (error) {
    console.log(error)
    return (error)
  }
};

const getFilteredItems = async ({ precio_min, precio_max, categoria, metal }) => {
  try {
    let filtros = []
    const values = []

    const agregarFiltro = (campo, comparador, valor) => {
      values.push(valor)
      const { length } = filtros
      filtros.push(`${campo} ${comparador} $${length + 1}`)
    }

    if (precio_max) agregarFiltro('precio', '<=', precio_max)
    if (precio_min) agregarFiltro('precio', '>=', precio_min)
    if (categoria) agregarFiltro('categoria', '=', categoria)
    if (metal) agregarFiltro('metal', '=', metal)

    let consulta = "SELECT * FROM inventario"

    if (filtros.length > 0) {
      filtros = filtros.join(" AND ")
      consulta += ` WHERE ${filtros}`
    }
    const { rows: items } = await pool.query(consulta, values)
    return items
  } catch (error) {
    console.log(error)
    return (error)
  }
};

module.exports = { getPaginatedItems, getAllItems, getFilteredItems };