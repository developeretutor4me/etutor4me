// Import necessary libraries
import { Schema, model, models } from 'mongoose';

// Define the schema for tutor documents
const TutorDocumentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming tutors are stored in the User model
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher', // Assuming tutors are stored in the User model
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  files: [
    {
      fileName: {
        type: String,
        required: true,
      },
      fileUrl: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Declined'],
    default: 'Pending',
  },
  adminRemarks: {
    type: String,
    default: '',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the model
const TutorDocument = models.TutorDocument || model('TutorDocument', TutorDocumentSchema);

export default TutorDocument;
