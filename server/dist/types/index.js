"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapcreateSchema = exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
});
exports.SigninSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.ZapcreateSchema = zod_1.z.object({
    AvailableTriggerId: zod_1.z.string(),
    triggerMetadata: zod_1.z.any().optional(),
    actions: zod_1.z.array(zod_1.z.object({
        AvailableActionId: zod_1.z.string(),
        actionMetadata: zod_1.z.any().optional(),
    })),
});
