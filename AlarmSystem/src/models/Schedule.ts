import { Expert } from "./Expert";
import { Period } from "./Plant";

export class Schedule extends Map<Period, Expert[]> {
    constructor() {
        super();
    }

    // Ensure there are experts for each period and each are unique
    isValid(): boolean {
        for (const exps of this.values()) {
            const ids = [...new Set(exps.map(exp => exp.id))];
            if (exps.length === 0 || exps.length !== ids.length) {
                return false;
            }
        }
        return true;
    }
}