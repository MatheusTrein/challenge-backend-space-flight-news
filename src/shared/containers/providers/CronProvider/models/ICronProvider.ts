interface ICronProvider {
  create(date: string, timezone: string, job: any): void;
}

export { ICronProvider };
