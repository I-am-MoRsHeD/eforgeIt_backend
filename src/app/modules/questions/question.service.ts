import { IQuestion } from "./question.interface";
import { Question } from "./question.model";

const MAX_QUESTIONS_PER_LEVEL = 22;

const createQuestions = async (payload: Partial<IQuestion>) => {
    const existingCount = await Question.countDocuments({ level: payload.level });

    if (existingCount >= MAX_QUESTIONS_PER_LEVEL) {
        throw new Error(`Cannot add more questions for level ${payload.level}. Limit of ${MAX_QUESTIONS_PER_LEVEL} reached.`);
    }

    const newQuestion = await Question.create(payload);

    return newQuestion;
};

const getAllQuestions = async () => {
    const questions = await Question.find();
    return questions;
};

export const QuestionServices = {
    createQuestions,
    getAllQuestions
};