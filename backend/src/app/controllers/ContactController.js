const isValidUUID = require("../utils/isValidUUID");
const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    // Listar todos os registros

    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    // Obter UM registro

    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid contact ID." });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "Contact not found" });
    }

    response.json(contact);
  }

  async store(request, response) {
    // Criar novo registro

    const { name, email, phone, category_id } = request.body;

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: "Invalid category ID." });
    }

    if (!name) {
      return response.status(400).json({ error: "Name is required!" });
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email);

      if (contactExists) {
        return response
          .status(400)
          .json({ error: "This email is already in use!" });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    // Editar um registro

    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid contact ID." });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: "Invalid category ID." });
    }

    if (!name) {
      return response.status(400).json({ error: "Name is required!" });
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: "Contact not found" });
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);

      if (contactByEmail && contactByEmail.id !== id) {
        return response
          .status(400)
          .json({ error: "This email is already in use!" });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // Deletar um registro

    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid contact ID." });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "Contact not found" });
    }

    await ContactsRepository.delete(id);
    response.status(200).json({ message: "Contact deleted!" });
  }
}

module.exports = new ContactController();
