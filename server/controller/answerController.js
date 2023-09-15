const qaPairs = [
  {
    question: "what is the weather today?",
    answer: "The weather today is sunny with a high of 75°F.",
  },
  {
    question: "what is SAP?",
    answer:
      "SAP, or Systems, Applications, and Products in Data Processing, is a leading enterprise resource planning (ERP) software suite that helps organizations manage their business operations effectively through integrated modules.",
  },
  {
    question: "tell me a joke.",
    answer: "Why did the chicken cross the road? To get to the other side!",
  },
  {
    question: "Hello",
    answer: "How can I assist you today?",
  },
  {
    question: "how are you?",
    answer: "I am Good. Thanks! How can I help you today?"
  },
  {
    question: "who won the last world cup?",
    answer: "France won the last world cup in 2018.",
  },
  {
    question: "javaScript program that logs Hello, World! to the console.",
    answer: "console.log(Hello, World!);",
  },
  {
    question: "what does CPU stand for?",
    answer: "CPU stands for Central Processing Unit.",
  },
];

exports.answerController = (req, res) => {
  try {
    const { question } = req.body;

    const lowerString = question.toLowerCase();

    const qaPair = qaPairs.find(
      (qa) => qa.question.toLocaleLowerCase() === lowerString
    );

    if (qaPair) {
      res.json({ answer: qaPair.answer });
    } else {
      res.json({ answer: "Sorry, I don't know the answer to that question." });
    }
  } catch (e) {
    console.log(e.message);
  }
};
