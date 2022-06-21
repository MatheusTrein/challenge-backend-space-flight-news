interface IMailConfig {
  driver: "ses" | "nodemailer";
}

const mailConfig = {
  driver: process.env.MAIL_DRIVER || "nodemailer",
} as IMailConfig;

export { mailConfig };
