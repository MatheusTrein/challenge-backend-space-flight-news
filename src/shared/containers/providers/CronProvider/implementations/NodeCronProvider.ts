import cron from "node-cron";
import { ICronProvider } from "../models/ICronProvider";

class NodeCronProvider implements ICronProvider {
  create(date: string, timeZone: string, job: any): void {
    const cronJob = cron.schedule(date, job, {
      scheduled: true,
      timezone: timeZone,
    });
    cronJob.start();
  }
}

export { NodeCronProvider };
