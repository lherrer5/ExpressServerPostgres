// exports.healthCheck = (_, res) => {
//     res.json({ status: 'ok' });
// };

// exports.welcomePage = (_, res) => {
//     res.send("Welcome!")
// };

import { Request, Response } from 'express';

export const healthCheck = (_: Request, res: Response) => {
    res.json({ status: 'ok' });
};

export const welcomePage = (_: Request, res: Response) => {
    res.send("Welcome!");
};