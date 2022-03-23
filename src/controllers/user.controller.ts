import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await getRepository(User).find();

        return res.status(200).json({ message: 'get users successfully', data: users });
    } catch (e: any) {
        return res.status(400).json({ message: e.message });
    }
}

export const addUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { firstName, lastName } = req.body;

        const users = getRepository(User).create({ firstName, lastName });
        await getRepository(User).save(users);

        return res.status(200).json({ message: 'add user successfully', data: users });
    } catch (e: any) {
        return res.status(400).json({ message: e.message });
    }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const user = await getRepository(User).findOne(id);

        return res.status(200).json({ message: 'get user successfully', data: user });
    } catch (e: any) {
        return res.status(400).json({ message: e.message });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { firstName, lastName } = req.body;

        const user = await getRepository(User).findOne(id);

        if (!user) return res.status(400).json({ message: 'user not exist' });

        const userUpdated = getRepository(User).merge(user, { firstName, lastName });

        await getRepository(User).save(userUpdated);

        return res.status(200).json({ message: 'updated user successfully', data: userUpdated });
    } catch (e: any) {
        return res.status(400).json({ message: e.message });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        await getRepository(User).delete(id);

        return res.status(200).json({ message: 'deleted user successfully' });
    } catch (e: any) {
        return res.status(400).json({ message: e.message });
    }
}