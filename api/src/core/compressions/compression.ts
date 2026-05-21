import { Request, Response } from 'express';

export const shouldCompress = (req: Request, res: Response): boolean => {
	if (req.headers['x-no-compression']) {
		return false;
	}
	return true;
};
