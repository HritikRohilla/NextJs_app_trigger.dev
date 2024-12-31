import { logger, task, wait } from "@trigger.dev/sdk/v3";
import sgMail from "@sendgrid/mail";

interface EmailPayload {
	to: string;
	subject: string;
	text: string;
	from: string;
}

export const sendEmailTask = task({
	id: "send-email",
	maxDuration: 300,
	run: async (payload: EmailPayload, { ctx }) => {
		try {
			sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

			const msg = {
				to: payload.to,
				from: payload.from,
				subject: payload.subject,
				text: payload.text,
			};

			logger.log("Sending email...", { payload });
			
			const response = await sgMail.send(msg);
			await wait.for({ seconds: 2 });

			return {
				success: true,
				messageId: response[0]?.headers['x-message-id'],
				statusCode: response[0]?.statusCode
			};

		} catch (error) {
			logger.error("Email sending failed", { error });
			throw error;
		}
	},
});