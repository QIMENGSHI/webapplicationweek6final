import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  filename: string;
  path: string;
}

const ImageSchema = new Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
});

export const Image = mongoose.model<IImage>('Image', ImageSchema);
