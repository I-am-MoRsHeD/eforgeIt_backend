/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import { ICertification } from '../modules/certification/certification.interface';
import { User } from '../modules/user/user.model';
import { IUser } from '../modules/user/user.interface';
import { envVars } from '../config/env';


async function generateCertificatePDF(data: Partial<ICertification>): Promise<Buffer> {
    try {
        if (!data.userId) throw new Error('UserId missing in certificate data');

        const user = await User.findById(data.userId) as IUser;
        if (!user) throw new Error('User not found');

        return await new Promise((resolve, reject) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const chunks: Buffer[] = [];

            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
            doc.on('error', reject);

            // Title
            doc.fontSize(28).text('Certificate of Achievement', { align: 'center' });
            doc.moveDown(2);

            // Recipient
            doc.fontSize(20).text(`Awarded to: ${user.fullName}`, { align: 'center' });
            doc.moveDown(1);

            // Level and score
            doc.fontSize(16).text(`Level Achieved: ${data.level}`, { align: 'center' });
            doc.text(`Score: ${data.score}`, { align: 'center' });
            doc.moveDown(1);

            // Dates
            doc.fontSize(12)
                .text(`Started time: ${data.startedAt}`, { align: 'center' })
                .text(`Completed time: ${data.completedAt}`, { align: 'center' })
                .text(`Issued At: ${data.issuedAt?.toDateString()}`, { align: 'center' });

            doc.moveDown(3);
            doc.fontSize(14).text('Congratulations on your achievement!', { align: 'center' });

            doc.end();
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

async function sendCertificateEmail(userEmail: string, pdfBuffer: Buffer) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envVars.MAIL_USER,
            pass: envVars.MAIL_PASS
        }
    });

    const mailOptions = {
        from: '"School Assessment Test" <no-reply@yourapp.com>',
        to: userEmail,
        subject: 'Your Certificate of Achievement',
        text: 'Congratulations! Please find your certificate attached.',
        attachments: [
            {
                filename: 'certificate.pdf',
                content: pdfBuffer,
            },
        ],
    };

    await transporter.sendMail(mailOptions);
}

// Generate the pdf and send to email
export async function generateAndSendCertificate(certificateDoc: any, userId: string) {
    const user = await User.findById(userId) as IUser;
    try {
        const pdfBuffer = await generateCertificatePDF({
            userId: user._id,
            level: certificateDoc.level,
            score: certificateDoc.score,
            startedAt: certificateDoc.startedAt,
            completedAt: certificateDoc.completedAt,
            issuedAt: certificateDoc.issuedAt,
        });

        await sendCertificateEmail(user.email, pdfBuffer);

        console.log('Certificate generated and email sent successfully.');
    } catch (error) {
        console.error('Error generating or sending certificate:', error);
        throw error;
    }
}
