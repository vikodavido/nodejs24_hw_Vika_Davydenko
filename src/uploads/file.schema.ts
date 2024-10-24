import { Schema, Document } from 'mongoose';


export interface File extends Document {
  originalName: string;
  filename: string;
  path: string;
}

export const FileSchema = new Schema<File>({
  originalName: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
});
