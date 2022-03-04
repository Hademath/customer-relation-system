import express from "express";
import { registerOrganization } from "../controller/OrganizationController";

const router = express.Router();

router.post("/organization", registerOrganization); //User Registration route




export default router;
