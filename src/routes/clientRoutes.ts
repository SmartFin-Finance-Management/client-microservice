import { Router } from 'express';
import { 
    addClient, 
    getAllClients, 
    getClientDetails, 
    updateClient, 
    deleteClient,
    getClientsByOrg,
    getProjectsByClient ,
    getMaxClientIdController
} from '../controller/clientController';  // Adjust the import path as necessary
import { getMaxClientId } from '../service/clientService';

const router = Router();

// Route to create a new client
router.post('/', addClient);

// Route to get all clients
router.get('/', getAllClients); // Added this line

// Route to get client details by ID
router.get('/:id', getClientDetails);

// Route to update client's contact information
router.put('/:id', updateClient);

// Route to delete a client by ID
router.delete('/:id', deleteClient);

router.get('/orgs/:org_id', getClientsByOrg); // New route to get clients by org ID

// Route to get all projects for a specific client
router.get('/projects/:client_id', getProjectsByClient); // New route for fetching projects by client ID

 router.get('/clientId/max',getMaxClientIdController); // New route for fetching

export default router;


