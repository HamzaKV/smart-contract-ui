/* eslint-disable react/display-name */
export interface IProps {
    condition: boolean;
}

const ConditionComposer =
    (OriginalComp: any, ConditionComp: any) =>
        ({ condition, ...props }: IProps) =>
            condition ? 
                <OriginalComp {...props} /> : 
                <ConditionComp {...props} />;

export default ConditionComposer;
