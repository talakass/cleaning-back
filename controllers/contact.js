const Contact = require("../model/contact");

const addMessage = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;
    const newContact = new Contact({
      fullName: fullName,
      email: email,
      subject: subject,
      message: message,
    });
    const contact = await newContact.save();
    res.status(200).json({ msg: "Message Added", data: contact });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ _id: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteMessages = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Contact.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { addMessage, getMessages ,deleteMessages };
