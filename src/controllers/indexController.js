const { getPaginatedItems, getAllItems, getFilteredItems } = require('../models/indexModel');

const paginatedItems = async (req, res) => {
  const { limits = 3, page = 1, order_by = "stock_ASC" } = req.query
  const items = await getPaginatedItems({ limits, page, order_by });
  const totalJoyas = Number(limits);
  const { length: stockTotal } = await getAllItems();
  const results = items.map(i => ({ name: i.nombre, href: `/joyas/joya/${i.id}` }))
  res.json({ totalJoyas, stockTotal, results });
};

const filteredItems = async (req, res) => {
  const { precio_min = 0,  precio_max = 0 , categoria = "", metal = ""  } = req.query
  const items = await getFilteredItems({ precio_min, precio_max, categoria, metal });
  res.json(items);
};

const notRoute = (req, res) => {
  res.status(404).json({ code: 404, message: "Esta ruta no existe" })
};

module.exports = { paginatedItems, filteredItems, notRoute };