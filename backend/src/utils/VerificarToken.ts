import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verificarToken(req: Request, res: Response, next: NextFunction) : any  {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expirado' });
            }
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        
        next(); 
    });
}

export function verificarTokenBoolean(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        next();  // Se não há token, apenas continua sem definir req.user
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            // Verificação do token falhou, continua sem definir req.user
            next();
            return;
        }
        
        req.user = user;  // Define o req.user se o token for válido
        next();
    });
}

