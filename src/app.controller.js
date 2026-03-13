import connectDB from "./DB/connections.js";
import { authRouter  } from "./modules/index.js";
import { userRouter  } from "./modules/index.js";
import { globalErrorHandler,NotFoundException} from "./utils/response/error.response.js";
import { successResponse } from "./utils/response/success.response.js";




const bootstrap = async (app, express) => {
  
    app.use(express.json());
    await connectDB();

    app.get("/", (req, res) => {
        return successResponse({res,
            statusCode:201,
            message:"welcome to sara7a app",
        });
    });

    app.use("/auth", authRouter);
    app.use("/user", userRouter);

    app.all("/*dummy", (req, res) => {
        throw NotFoundException(" not found handler");
    });


    app.use(globalErrorHandler)
};

export default bootstrap;
