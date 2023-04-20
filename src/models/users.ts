import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import randomstring from 'randomstring'

export interface INewUser {
  name?: string;
  email?: string;
  password?: string;
  age?: string;
  secretToken?: string;
  resetToken?: string;
  active?: boolean;
}

export interface IUserResponse {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  age?: string;
  secretToken?: string;
  resetToken?: string;
  active?: boolean;
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  age?: string;
  secretToken?: string;
  resetToken?: string;
  active?: boolean;
  admin?: boolean;
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'Password should be at least six characters'],
    select: false
  },
  age: {
    type: String
  },
  secretToken: {
    type: String
  },
  resetToken: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true,
  versionKey: false
})

UserSchema.pre('save', userPreSaveHook)

export async function userPreSaveHook (next: () => void) {
  this.password = await bcrypt.hash(this.password, 10)
  this.secretToken = randomstring.generate({
    length: 8,
    charset: 'numeric'
  })
  this.resetToken = randomstring.generate({
    length: 8,
    charset: 'numeric'
  })
  next()
}

UserSchema.index({ email: 1 })

const User = mongoose.model<IUser>('User', UserSchema)

export { User }
