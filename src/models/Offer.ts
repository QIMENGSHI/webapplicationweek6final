import mongoose, { Schema, Document } from 'mongoose';

export interface IOffer extends Document {
    title: string;
    description: string;
    price: number;
}

const OfferSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

export const Offer = mongoose.model<IOffer>('Offer', OfferSchema);
