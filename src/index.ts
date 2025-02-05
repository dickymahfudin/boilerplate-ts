import "express-async-errors";
import connectMongoDB from "@config/mongodb";
import ExpressApp from "@config/ExpressApp";
import http from "@delivery/http";

connectMongoDB();

const expressApp = new ExpressApp(http);
expressApp.start();
