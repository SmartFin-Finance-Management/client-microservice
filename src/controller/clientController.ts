import { Request, Response } from 'express';
import clientService from '../service/clientService';

// Add a new client
export const addClient = async (req: Request, res: Response): Promise<void> => {
    try {
        const newClient = await clientService.addClient(req.body);
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
        const client = await clientService.getClientById(req.params.id);
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
    try {
        const updatedClient = await clientService.updateClient(req.params.id, req.body);
        if (!updatedClient) {
            res.status(404).json({ message: 'Client not found' });
            return;
        }
        res.status(200).json(updatedClient);
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
        const deletedClient = await clientService.deleteClient(req.params.id);
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
        const clients = await clientService.getAllClients();
        res.status(200).json(clients);
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
        const clients = await clientService.getClientsByOrg(orgId);
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
        const projects = await clientService.getProjectsByClient(clientId);
        res.status(200).json(projects);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

