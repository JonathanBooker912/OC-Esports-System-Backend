import { Router } from "express";
import AliasRoutes from "./alias.routes.js"
import AuthRoutes from "./auth.routes.js"
import UserRoutes from "./user.routes.js"
import TitleRoutes from "./title.routes.js"
import TeamRoutes from "./team.routes.js"
import EmergencyContactRoutes from "./emergencyContact.routes.js";

const router = Router()

router.use("/user", UserRoutes);
router.use("/user", AliasRoutes);
router.use("/user", EmergencyContactRoutes);

router.use("/", AuthRoutes);
router.use("/titles", TitleRoutes);
router.use("/teams", TeamRoutes);

export default router;