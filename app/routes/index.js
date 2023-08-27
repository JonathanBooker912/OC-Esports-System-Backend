import { Router } from "express";
import AliasRoutes from "./alias.routes.js"
import AuthRoutes from "./auth.routes.js"
import UserRoutes from "./user.routes.js"
import TitleRoutes from "./title.routes.js"
import TeamRoutes from "./team.routes.js"
import EmergencyContactRoutes from "./emergencyContact.routes.js";

const router = Router()

router.use("/EsportsAPI/user", AliasRoutes);
router.use("/EsportsAPI", AuthRoutes);
router.use("/EsportsAPI/user", UserRoutes);
router.use("/EsportsAPI/titles", TitleRoutes);
router.use("/EsportsAPI/teams", TeamRoutes);
router.use("/EsportsAPI/user", EmergencyContactRoutes);

export default router;