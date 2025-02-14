export enum Qualification {
    ELEC = "Electrical",
    MECH = "Mechanical",
    BIO = "Biological",
    CHEM = "Chemical",
}

export class Expert {
    id: number;
    qualification: Qualification;

    constructor(id: number, qualification: Qualification) {
        this.id = id;
        this.qualification = qualification;
    }
}