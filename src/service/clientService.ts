import Client, { IClient } from '../models/clientModel';
import axios from 'axios';


/*const PROJECT_MICROSERVICE_URL = 'http://localhost/api/projects';*/

class ClientService {
    async addClient(data: IClient): Promise<IClient> {
        const newClient = new Client(data);
        return await newClient.save();
    }

    async getClientById(id: string): Promise<IClient | null> {
        return await Client.findOne({clientId: id});
    }

    async updateClient(id: string, data: Partial<IClient>): Promise<IClient | null> {
        return await Client.findOneAndUpdate({clientId:id}, data, { new: true });
    }

    async deleteClient(id: string): Promise<IClient | null> {
        return await Client.findOneAndDelete({clientId:id});
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

export const getMaxClientId = async (): Promise<number> => {
    try {
      // Fetch the client with the maximum client_id
      const maxClient = await Client.findOne({}, { clientId: 1 }) // Retrieve only the client_id field
        .sort({ clientId: -1 }) // Sort in descending order to get the max id
        .limit(1); // Limit to 1 result
  
      // Return max client_id or 0 if not found
      return maxClient ? maxClient.clientId : 0;
      console.log(maxClient)
    } catch (error) {
      console.error(`Error fetching max client_id: ${error}`);
      throw new Error(`Error fetching maximum client_id: ${error}`);
    }
  };

export default new ClientService();
