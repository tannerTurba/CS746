import { Qualification } from "./Expert";

export class Alarm {
    description: string;
    qualification: Qualification;

    constructor(description: string, qualification: Qualification) {
        this.description = description;
        this.qualification = qualification;
    }
}