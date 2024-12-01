import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';
import validator from 'validator';
import isEmail from 'validator/lib/isEmail';

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
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxLength: [20, 'first Name can not be more than 20'],
    validate: {
      validator: function (value) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not a capitaliz formate',
    },
  },
  middleName: { type: String, required: false },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

// Local Guardian Subdocument Schema
const LocalGuardianSchema = new Schema<LocalGuardian>({
  guardianName: { type: String, required: true },
  guardianOccupation: { type: String, required: true },
  guardianContactNo: { type: String, required: true },
});

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: { type: UserNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'error messager for gender',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Enail is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is mot a valid email',
    },
    //   validate:{
    //   validator: (value: string)=> validator,isEmail(value),
    //   message:'{VALUE} is not a valid email type'

    // },
  },
  contactNumber: { type: String, required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'O+', 'O-', 'B+', 'B-'] },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
  localGuardian: { type: LocalGuardianSchema, required: true },
  profileImg: { type: String },
  avatar: { type: String },
  isActive: { type: String, enum: ['active', 'blocked'], required: true },
});

// 3. Create a Model.
export const StudentModel = model<Student>('Student', studentSchema);
