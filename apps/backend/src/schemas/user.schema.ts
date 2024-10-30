import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * User schema for MongoDB, defining the structure of user data.
 * Each user has a unique email, a hashed password, and an optional name.
 */
@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true }) // Unique and required email
  email!: string;

  @Prop({ required: true }) // Required hashed password
  password!: string;

  @Prop() // Optional user name
  name?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);