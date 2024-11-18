import Contact from "../models/contact.model.js";

export default class ContactController {
  static async createContact(req, res) {
    try {
      const contact = await Contact.create(req.body);

      return res.status(201).json(contact);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed to create contact.",
        error: error.message,
      });
    }
  }

  static async getContacts(req, res) {
    try {
      let {
        sortField = "lastName",
        sortOrder = 1,
        page = 1,
        limit = 10,
      } = req.query;

      // Sanitize sortOrder
      sortOrder = parseInt(sortOrder, 10);
      if (isNaN(sortOrder) || ![1, -1].includes(sortOrder)) {
        throw new Error("Invalid sort order value.");
      }

      // Validate sortField
      const validFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "company",
        "jobTitle",
      ];
      if (!validFields.includes(sortField)) {
        throw new Error(`Invalid sort field: ${sortField}`);
      }

      const skip = (page - 1) * limit;

      const contacts = await Contact.find()
        .sort({ [sortField]: sortOrder }) // Sorting
        .skip(skip) // Pagination
        .limit(Number(limit)); // Limit results

      const totalContacts = await Contact.countDocuments();

      res.status(200).json({
        success: true,
        data: contacts,
        totalContacts,
        totalPages: Math.ceil(totalContacts / limit),
        currentPage: Number(page),
      });
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
      res.status(500).json({
        message: "Failed to fetch contacts.",
        error: error.message,
      });
    }
  }

  static async getContactById(req, res) {
    try {
      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Failed to fetch contact by id.",
        error: error.message,
      });
    }
  }

  static async updateContact(req, res) {
    try {
      const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Failed to update contact.",
        error: error.message,
      });
    }
  }

  static async deleteContact(req, res) {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Failed to delete contact.",
        error: error.message,
      });
    }
  }
}
