import { Router } from 'express';
import { addUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('', addUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;