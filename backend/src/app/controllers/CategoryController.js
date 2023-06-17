const isValidUUID = require("../utils/isValidUUID.js");
const CategoriesRespository = require("../repositories/CategoriesRespository.js");

class CategoryController {
  async index(request, response) {
    // Lista todo o registro

    const categories = await CategoriesRespository.findAll();
    response.json(categories);
  }

  async show(request, response) {
    // Obter apenas UM registro

    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response
        .status(400)
        .json({ error: "Categories`s ID is invalid." });
    }

    const category = await CategoriesRespository.findById(id);

    if (!category) {
      response.status(404).json({ error: "Category not found!" });
    }

    response.json(category);
  }

  async store(request, response) {
    // Cria um novo registro

    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required!" });
    }

    const category = await CategoriesRespository.create({ name });
    response.status(201).json(category);
  }

  async update(request, response) {
    // Atualiza um registro
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required!" });
    }

    const categoryExists = await CategoriesRespository.findByName(name);

    if (categoryExists) {
      return response
        .status(400)
        .json({ error: "Category is already in use!" });
    }

    const category = await CategoriesRespository.update(id, { name });
    response.json(category);
  }

  async delete(request, response) {
    // Apaga um registro
    const { id } = request.params;
    const category = await CategoriesRespository.findById(id);

    if (!category) {
      return response.status(404).json({ error: "Category not found!" });
    }

    await CategoriesRespository.delete(id);
    response.status(200).json({ message: "Category deleted!" });
  }
}

module.exports = new CategoryController();
