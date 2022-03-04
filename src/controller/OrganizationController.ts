import express, { Request, Response, NextFunction } from "express";
import db from "../db/models/organization";
const {Organization} = db as any 






export async function registerOrganization(req: Request, res: Response, next: NextFunction) {
    try {
        res.send("Organization working")
    } catch (error) {
        res.send("error")
    }
}

