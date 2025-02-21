import { Alarm } from "./Alarm";
import { Expert } from "./Expert";
import { Period } from "./Period";
import { Qualification } from "./Qualification";
import { Schedule } from "./Schedule";

export class Plant {
    schedule: Schedule;
    alarms: Alarm[];

    constructor(schedule: Schedule, alarms: Alarm[]) {
        this.schedule = schedule;
        this.alarms = alarms;
    }

    updateSchedule(s: Schedule): void {
        this.schedule = s;
    }

    updateAlarms(a: Alarm[]): void {
        this.alarms = a;
    }

    getInvalidPeriods(): Period[] {
        const periods: Period[] = [];
        for (const alarm of this.alarms) {
            for (const period of this.schedule.keys()) {
                const experts = this.schedule.get(period);
                if (experts && !this.qualificationSupported(experts, alarm.qualification)) {
                    periods.push(period);
                }
            }
        
        }
        return periods;
    }

    getNumberOfExperts(period: Period): number {
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
                availableExperts = availableExperts.filter((x) => x.qualifications.map(x => x.value).includes(alarm.qualification.value));

                if (availableExperts.length > 0) {
                    return availableExperts[0];
                }
            }
        }
        return undefined;
    }

    private qualificationSupported(experts: Expert[], qualification: Qualification): boolean {
        const allQualis = experts.map(x => x.qualifications).flat().map(x => x.value);
        return allQualis.includes(qualification.value);
    }
}