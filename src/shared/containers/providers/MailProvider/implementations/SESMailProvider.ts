import "dotenv/config";
import { IMailProvider } from "../models/IMailProvider";
import aws from "aws-sdk";
import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import { ISendMail } from "../dtos/ISendMail";

class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }

  public async sendMail({ from, to, body, subject }: ISendMail): Promise<void> {
    await this.client.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      text: body, // plain text body
    });
  }
}

export { SESMailProvider };
