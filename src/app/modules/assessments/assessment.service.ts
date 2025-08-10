import { Types } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Question } from "../questions/question.model";
import { IAssessments, TResponse } from "./assessment.interface";
import { Assessment } from "./assessment.model";
import { generateAndSendCertificate } from "../../utils/certificate";


const createAssessment = async (payload: Partial<IAssessments>, step: number, userId: string) => {
    const responses = payload.responses as TResponse[];

    if (responses.length < 44) {
        throw new AppError(400, "Please fill all the fields");
    }
    const questionsId = responses.map(res => new Types.ObjectId(res.question));

    const getQuestions = await Question.find(
        { _id: { $in: questionsId } },
        { correctAnswer: 1, level: 1 }
    );

    let correctCount = 0;
    for (const res of responses) {
        const ques = getQuestions.find(ques => ques?._id.toString() === res.question);
        if (ques && ques.correctAnswer === res.answer) {
            correctCount++;
        };
    };

    const score = ((Number(correctCount) / Number(responses.length)) * 100);

    let certification = null;
    const certificateDoc = {
        userId: userId,
        level: '',
        score: 0,
        startedAt: payload.startedAt,
        completedAt: payload.completedAt,
        issuedAt: new Date(),
    }
    if (step === 1) {
        if (score < 25) {
            certification = "Fail. Can't retake the test";
        }
        else if (score < 50) {
            certification = "A1"
            certificateDoc.level = "A1"
            certificateDoc.score = Number(score.toFixed(2))
        }
        else if (score < 75) {
            certification = "A2"
            certificateDoc.level = "A2"
            certificateDoc.score = Number(score.toFixed(2))
        }
        else {
            certification = "A2 + Proceed to Step 2";
            payload.nextStepEligible = true
        }
    } else if (step === 2) {
        if (score < 25) {
            certification = "A2";
            certificateDoc.level = "A2"
            certificateDoc.score = Number(score.toFixed(2))
        }
        else if (score < 50) {
            certification = "B1";
            certificateDoc.level = "B1"
            certificateDoc.score = Number(score.toFixed(2))
        }
        else if (score < 75) {
            certification = "B2";
            certificateDoc.level = "B2"
            certificateDoc.score = Number(score.toFixed(2))
        }
        else {
            certification = "B2 + Proceed to Step 3";
            payload.nextStepEligible = true
        }
    } else if (step === 3) {
        if (score < 25) {
            certification = "B2";
            certificateDoc.level = "B2"
            certificateDoc.score = Number(score.toFixed(2))
        }
        else if (score < 50) {
            certification = "C1";
            certificateDoc.level = "C1"
            certificateDoc.score = Number(score.toFixed(2))
        }
        else {
            certification = "C2";
            certificateDoc.level = "C2"
            certificateDoc.score = Number(score.toFixed(2))
            payload.nextStepEligible = false
        }
    };

    const data = {
        userId,
        responses,
        score,
        certificateLevel: certification,
        startedAt: payload.startedAt,
        completedAt: payload.completedAt,
        timeExpired: payload.timeExpired,
        nextStepEligible: false
    };

    const assessment = await Assessment.create(data);
    generateAndSendCertificate(certificateDoc, userId)
    return assessment
};

export const AssessmentServices = {
    createAssessment
}