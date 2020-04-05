import * as React from "react";

export interface TextAreaPropsProps {
    onChange: (value: string) => void;
    rows: number;
}

const TextArea: React.FunctionComponent<TextAreaPropsProps> = (props: TextAreaPropsProps) => {
    const onChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(target.value);
    };
    return <textarea rows={props.rows} onChange={onChange} />;
};

export default TextArea;
