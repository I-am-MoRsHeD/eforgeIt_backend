import z from "zod";
import { Competency } from "../../interface/globalTypes";
import { TLevel } from "./question.interface";


export const createQuestionZodSchema = z.object({
    question: z
        .string({ error: "Question must be string" }),
    options: z
        .array(z.string()),
    correctAnswer: z
        .string({ error: "Password must be string" }),
    competency: z
        .enum(Object.values(Competency) as [string])
        .optional(),
    level: z
        .enum(Object.values(TLevel) as [string])
        .optional(),
});
