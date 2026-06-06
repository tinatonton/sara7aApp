import { Router } from "express";
import * as authService from "./auth.service.js";
import * as authValidation from "./auth.validation.js";
import { authenticationMiddleware, authorizationMiddleware } from "../../Middleware/auth.middleware.js";
import { RoleEnum, TokenTypeEnum } from "../../Utils/enums/user.enum.js";
import { validation } from "../../Middleware/validation.middleware.js";

const router = Router();

router.post(
  "/signup",
  validation(authValidation.signupSchema),
  authService.signUp,
);
router.patch(
  "/confirm-email",
  validation(authValidation.confirmEmailSchema),
  authService.confirmEmail,
);
router.post(
  "/login",
  validation(authValidation.loginSchema),
  authService.logIn,
);
router.post(
  "/refresh-token",
  authenticationMiddleware({ tokenType: TokenTypeEnum.Refresh }),
  authService.refreshToken,
);

router.post("/social-login", authService.googleLogin);

router.post(
  "/logout",
  authenticationMiddleware({ tokenType: TokenTypeEnum.Access }),
  authService.logout,
);

router.post(
  "/logout-with-redis",
  authenticationMiddleware({ tokenType: TokenTypeEnum.Access }),
  authService.logoutWithRedis,
);
router.patch(
  "/forget-password",
  validation(authValidation.forgetPasswordSchema),
  authService.forgetPassword,
);

router.patch(
  "/reset-password",
  validation(authValidation.resetPasswordSchema),
  authService.resetPassword,
);


export default router;
