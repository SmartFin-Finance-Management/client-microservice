import { Request, Response } from 'express';
import Client, { IClient } from '../models/clientModel';
import axios from 'axios';

// Add a new client
export const addClient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { org_id, name, contact_info } = req.body;
        const newClient = new Client({ org_id, name, contact_info });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

// Get details of a client by ID
export const getClientDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            res.status(404).json({ message: 'Client not found' });
            return;
        }
        res.status(200).json(client);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

// Update contact information of a client
export const updateClient = async (req: Request, res: Response): Promise<void> => {
    const clientId = req.params.id;

    try {
        const updatedClient = await Client.findByIdAndUpdate(clientId, req.body, { new: true });
        if (!updatedClient) {
            res.status(404).json({ message: 'Client not found' });
            return;
        }
        res.status(200).json(updatedClient); // Return the updated client in the response body
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

// Delete a client by ID
export const deleteClient = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            res.status(404).json({ message: 'Client not found' });
            return;
        }
        res.status(204).send();
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

export const getAllClients = async (req: Request, res: Response): Promise<void> => {
    try {
        const clients = await Client.find(); // Fetch all clients from the database
        res.status(200).json(clients); // Return clients
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

export const getClientsByOrg = async (req: Request, res: Response): Promise<void> => {
    const orgId = req.params.org_id;

    try {
        const clients = await Client.find({ org_id: orgId }); // Fetch clients by organization ID
        res.status(200).json(clients);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

// Retrieve all projects for a specific client
export const getProjectsByClient = async (req: Request, res: Response): Promise<void> => {
    const clientId = req.params.client_id;

    try {
        // Assuming your project microservice is running at this URL
        const response = await axios.get(`http://localhost/api/projects/client/${clientId}`);
        res.status(200).json(response.data); // Return the projects fetched from the microservice
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};
