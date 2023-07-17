export class Record {
  Name!: string;
  roomNo!: string;
  mobileNo!: string;
  age!: string;
  key?: string;

  constructor(data: Partial<Record>) {
    Object.assign(this, data);
  }
}
