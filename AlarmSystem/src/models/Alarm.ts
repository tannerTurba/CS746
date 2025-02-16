import { Qualification } from "./Expert";

export interface OptionType {
    toString: () => string;
}

export class Alarm implements OptionType {
    description: string;
    qualification: Qualification;

    constructor(description: string, qualification: Qualification) {
        this.description = description;
        this.qualification = qualification;
    }

    toString(): string {
        return this.description;
    }
}