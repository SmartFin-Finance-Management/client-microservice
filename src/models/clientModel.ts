import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
    org_id: number;
    name: string;
    contact_info: string;
}

const clientSchema: Schema = new Schema({
    org_id: { type: Number, required: true },
    name: { type: String, required: true },
    contact_info: { type: String, required: true },
});

const Client = mongoose.model<IClient>('Client', clientSchema);
export default Client;
