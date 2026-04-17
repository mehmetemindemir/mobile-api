import { Router } from "express";
import {
  addRestaurant,
  getRestaurants,
  getNearby
} from "../controllers/restaurant.controller";
import { validate } from "../middleware/validate.middleware";
import {
  addRestaurantSchema,
  nearbyQuerySchema
} from "../validators/restaurant.validator";

const router = Router();

router.post("/", validate(addRestaurantSchema), addRestaurant);
router.get("/", getRestaurants);
router.get("/nearby", validate(nearbyQuerySchema), getNearby);

export default router;
