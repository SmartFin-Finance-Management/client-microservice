import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
    clientId: number;
    orgId: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    status: string;
}

const clientSchema: Schema = new Schema({
    clientId: { type: Number, required: true, unique: true }, // Ensure clientId is unique
    orgId: { type: Number, required: true }, // Organization ID
    name: { type: String, required: true }, // Client name
    phone: { type: String, required: true }, // Phone number
    email: { type: String, required: true }, // Email address
    address: { type: String, required: true }, // Address
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

const Client = mongoose.model<IClient>('Client', clientSchema);
export default Client;
