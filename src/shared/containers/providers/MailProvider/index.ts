import { mailConfig } from "../../../../config/mail";
import { container } from "tsyringe";
import { NodemailerMailProvider } from "./implementations/NodemailerMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";
import { IMailProvider } from "./models/IMailProvider";

const providers = {
  ses: new SESMailProvider(),
  nodemailer: new NodemailerMailProvider(),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  providers[mailConfig.driver]
);
