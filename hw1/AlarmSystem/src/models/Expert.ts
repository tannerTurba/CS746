import { OptionType } from "./Alarm";
import { Qualification } from "./Qualification";

export class Expert implements OptionType {
    id: number;
    qualifications: Qualification[];

    constructor(id: number, qualification: Qualification[]) {
        this.id = id;
        this.qualifications = qualification;
    }

    toString(): string {
        return `Expert ${this.id}`;
    }
}