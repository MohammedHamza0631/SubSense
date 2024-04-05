import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  reminder_title: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
});

const ReminderModel = mongoose.model("Reminder", reminderSchema);

export default ReminderModel;
