import Mood from '/models/Mood.js';

// Simpan mood
export const saveMood = async (req, res) => {
  const { userId, mood, note, date } = req.body;

  try {
    const newMood = await Mood.create({ userId, mood, note, date });
    res.json({ success: true, data: newMood });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ambil mood berdasarkan tanggal
export const getMoodByDate = async (req, res) => {
  const { userId, date } = req.params;

  try {
    const mood = await Mood.findOne({ userId, date });
    res.json({ success: true, data: mood });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ambil semua mood untuk kalender
export const getCalendarMoods = async (req, res) => {
  const { userId } = req.params;

  try {
    const moods = await Mood.find({ userId });
    res.json({ success: true, data: moods });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
