import { OptionType } from "./Alarm";

export enum Qualification {
    ELEC = "Electrical",
    MECH = "Mechanical",
    BIO = "Biological",
    CHEM = "Chemical",
}

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