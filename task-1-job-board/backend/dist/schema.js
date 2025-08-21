import * as z from "zod";
export const CreateUserSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().min(6).max(30),
    password: z.string().min(6).max(30),
});
//# sourceMappingURL=schema.js.map