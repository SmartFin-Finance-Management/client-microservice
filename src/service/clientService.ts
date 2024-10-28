import Client, { IClient } from '../models/clientModel';
import axios from 'axios';

/*const PROJECT_MICROSERVICE_URL = 'http://localhost/api/projects';*/

class ClientService {
    async addClient(data: IClient): Promise<IClient> {
        const newClient = new Client(data);
        return await newClient.save();
    }

    async getClientById(id: string): Promise<IClient | null> {
        return await Client.findById(id);
    }

    async updateClient(id: string, data: Partial<IClient>): Promise<IClient | null> {
        return await Client.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteClient(id: string): Promise<IClient | null> {
        return await Client.findByIdAndDelete(id);
    }

    async getAllClients(): Promise<IClient[]> {
        return await Client.find();
    }

    async getClientsByOrg(orgId: string): Promise<IClient[]> {
        return await Client.find({ org_id: orgId });
    }

    async getProjectsByClient(clientId: string): Promise<any> {
        const response = await axios.get(`http://localhost:4000/api/projects/client/${clientId}`);
        return response.data;
    }
}

export default new ClientService();
