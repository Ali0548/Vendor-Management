import Cron from '@/api/models/cronJobs/cron';
import { CronStatus } from '@/api/models/cronJobs/enums';
import { ICron } from '@/api/models/cronJobs/types';
import mongoose from 'mongoose';

export class CronService {
  async createCron(ftpId: mongoose.Types.ObjectId, operations: string[], schedule: string, createdBy: mongoose.Types.ObjectId): Promise<ICron> {
    const nextRun = this.getNextRunTime(schedule);
    
    const cronJob = new Cron({
      ftp: ftpId,
      operations,
      schedule,
      status: CronStatus.PENDING,
      nextRun,
      createdBy,
    });

    return await cronJob.save();
  }

  async getCronsByFtp(ftpId: mongoose.Types.ObjectId): Promise<ICron[]> {
    return await Cron.find({ ftp: ftpId }).populate('ftp').exec();
  }

  async updateCronStatus(cronId: mongoose.Types.ObjectId, status: CronStatus, lastRun?: Date): Promise<ICron | null> {
    const cronJob = await Cron.findById(cronId);
    if (!cronJob) {
      return null;
    }
    return await Cron.findByIdAndUpdate(
      cronId,
      { status, lastRun, nextRun: this.getNextRunTime(cronJob.schedule) },
      { new: true }
    );
  }

  async deleteCron(cronId: mongoose.Types.ObjectId): Promise<void> {
    await Cron.findByIdAndDelete(cronId);
  }

  getNextRunTime(schedule: string): Date {
    // Logic to calculate the next run time based on the schedule
    const nextRunDate = new Date(); 
    return nextRunDate;
  }
}

export default new CronService();
