import { Alarm } from "./Alarm";
import { Expert, Qualification } from "./Expert";
import { Schedule } from "./Schedule";

export enum Period {
    P1 = "Monday day",
    P2 = "Monday night",
    P3 = "Tuesday day",
    P4 = "Tuesday night",
    P5 = "Wednesday day",
}

export class Plant {
    schedule: Schedule;
    alarms: Alarm[];
    isValid: boolean = true;

    constructor(schedule: Schedule, alarms: Alarm[]) {
        this.schedule = schedule;
        this.alarms = alarms;

        for (const alarm of this.alarms) {
            for (const period of this.schedule.keys()) {
                const experts = this.schedule.get(period);
                if (experts && !this.qualificationsOk(experts, alarm.qualification)) {
                    this.isValid = false;
                    break;
                }
            }
        }
    }

    getNumberOfExperts(period: Period): number {
        console.log(this.schedule);
        console.log(this.schedule.keys());
        if ([...this.schedule.keys()].includes(period)) {
            const experts = this.schedule.get(period);
    
            if (experts) {
                return experts.length;
            }
        }
        return -1;
    }

    getExpertSchedule(expert: Expert): Period[] {
        const periods: Period[] = [];
        for (const [peri, exps] of this.schedule.entries()) {
            if (exps.includes(expert)) {
                periods.push(peri);
            }
        }
        return periods;
    }

    getExpertToPage(alarm: Alarm, period: Period): Expert | undefined {
        if (this.schedule.has(period) && this.alarms.includes(alarm)) {
            let availableExperts = this.schedule.get(period);
            if (availableExperts) {
                availableExperts = availableExperts.filter((x) => x.qualifications.includes(alarm.qualification));
                if (availableExperts.length > 0) {
                    return availableExperts[0];
                }
            }
        }
        return undefined;
    }

    private qualificationsOk(experts: Expert[], qualification: Qualification): boolean {
        const allQualis = experts.map(x => x.qualifications).flat();
        return allQualis.includes(qualification);
    }
}