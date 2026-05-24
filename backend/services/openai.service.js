const {
  GoogleGenerativeAI
} = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

exports.askAI = async (message) => {

  try {

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash'
    });

    const result = await model.generateContent(
      message
    );

    const response = await result.response;

    return response.text();

  } catch (error) {

    console.log('Gemini Error:', error);

    throw error;

  }

};