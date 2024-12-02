const Feedback = require('../model/feedback');

exports.submitFeedback = async (req, res) => {
  const { name, route, feedback } = req.body;

  try {
    const newFeedback = new Feedback({ name, route, feedback });
    await newFeedback.save();

    res.status(200).send('Feedback submitted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to submit feedback.');
  }
};
