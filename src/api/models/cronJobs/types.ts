import { Document, ObjectId } from 'mongoose';
import { CronStatus } from './enums';

export interface ICron extends Document {
 ftp: ObjectId;
  operations: string[];
  schedule: string;
  status: CronStatus;
  lastRun?: Date;
  nextRun: Date;
  createdBy: ObjectId;
}
