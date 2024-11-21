import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

// Guardian Subdocument Schema
const GuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

// UserName Subdocument Schema
const UserNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
});

// Local Guardian Subdocument Schema
const LocalGuardianSchema = new Schema<LocalGuardian>({
  guardianName: { type: String, required: true },
  guardianOccupation: { type: String, required: true },
  guardianContactNo: { type: String, required: true },
});

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: { type: UserNameSchema, required: true },
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'O+', 'O-', 'B+', 'B-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
  localGuardian: { type: LocalGuardianSchema, required: true },
  profileImg: { type: String },
  avatar: { type: String },
  isActive: ['active', 'blocked'],
});

// 3. Create a Model.
export const StudentModel = model<Student>('Student', studentSchema);
