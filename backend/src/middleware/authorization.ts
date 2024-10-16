import { NextFunction, Request, Response } from "express";
import { infoToken, validateToken } from "../utils/jwt";

function authorization(req: Request, res: Response, next: NextFunction) {
	const headers = req.headers;
	const authorization = headers.authorization;

	if (!authorization) {
		return res
			.status(401)
			.json({ error: "passe o campo authorization pelo header" });
	}

	infoToken(authorization);

	if (!authorization.includes("Bearer ")) {
		return res
			.status(401)
			.json({
				error: "passe no campo authorization o trecho 'Bearer ' + token",
			});
	}

	const token = authorization.replace("Bearer ", "");
	const isTokenValid = validateToken(token);

	if (typeof isTokenValid === "string") {
		return res
			.status(401)
			.json({ error: "falha na autenticação", message: isTokenValid });
	}

	next();
}

const safeRoutes = ["/customers", "/orders"];

export { authorization, safeRoutes };
