import nodemailer from "nodemailer";
import { ISendMail } from "../dtos/ISendMail";
import { IMailProvider } from "../models/IMailProvider";

class NodemailerMailProvider implements IMailProvider {
  public async sendMail({ from, to, body, subject }: ISendMail): Promise<void> {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    const info = await transporter.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      text: body, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

export { NodemailerMailProvider };
