// test-email.ts
import dotenv from 'dotenv';
import * as sgMail from '@sendgrid/mail';

dotenv.config();

const sendTestEmail = async () => {
	try {
		// Set API key
		const apiKey = process.env.SENDGRID_API_KEY;
		if (!apiKey) {
			throw new Error('SENDGRID_API_KEY not found in environment');
		}
		sgMail.setApiKey(apiKey);

		// Email content
		const msg = {
			"to": "hritik.rohilla@ambibuzz.com",
			"from": "info@quickcargo.com.au",
			"subject": "Test Email from Hritik Rohilla",
			"text": "Hello from Trigger.dev! This is praveen Gupta project"
		};
		// Send email
		const response = await sgMail.send(msg);
		console.log('Email sent successfully:', response[0].statusCode);
		return response;

	} catch (error: any) {
		console.error('Error sending email:', {
			message: error.message,
			response: error.response?.body
		});
		throw error;
	}
};

// Execute test
sendTestEmail();