import { TextField } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ISingleEntryTabProps } from "../Tabs/QualificationsTab";

export type SingleEntryFormHandle = {
    evaluateForm: () => string | undefined;
}

const SingleEntryForm = forwardRef((props: ISingleEntryTabProps, ref) => {
    const containerRef = useRef(null);
    const [value, setValue] = useState<string | null>("");
    
    useImperativeHandle(ref, () => ({
        evaluateForm,
    }));

    const evaluateForm = () => {
        if (value === "") {
            setValue(null);
            return undefined;
        }

        if (value) {
            setValue("");
            return value;
        }
    }

    return (
        <form ref={containerRef}>
            <TextField
                required
                error={value === null}
                id="standard-error-helper-text"
                label="Qualification"
                helperText={value === null ? "Provide a Qualification" : ""}
                variant="standard"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </form>
    );
});

export default SingleEntryForm;