const { askAI } = require('../services/openai.service');

exports.chatWithAI = async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {

      return res.status(400).json({
        message: 'Message required'
      });

    }

    const reply = await askAI(message);

    res.json({
      reply
    });

  } catch (error) {

    console.log(
    error.response?.data ||
    error.message ||
    error
    );

    res.status(500).json({
      message: error.message
    });

  }

};