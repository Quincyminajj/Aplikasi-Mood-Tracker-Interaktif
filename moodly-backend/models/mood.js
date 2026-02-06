import mongoose from 'mongoose';

const MoodSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mood: { type: String, required: true },
  note: { type: String, default: "" },
  date: { type: String, required: true }
});

export default mongoose.model('Mood', MoodSchema);
