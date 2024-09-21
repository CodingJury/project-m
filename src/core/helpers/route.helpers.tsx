import { RoutesInterface } from "../routes/interface";
import { PUBLIC_ROUTES } from "../routes/public.route";

 export function getRoutesBasedOnAuthentication(): RoutesInterface[] {
  /**BASED ON USER LOGGEDIN STATUS */
  return PUBLIC_ROUTES
 }