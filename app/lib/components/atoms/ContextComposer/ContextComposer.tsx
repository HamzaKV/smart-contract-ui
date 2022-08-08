/* eslint-disable react/display-name */
const ContextComposer =
    (ChildComponent: any, ...ContextComponents: any[]) =>
        (props: any) => {
            const Component = compose(ChildComponent, ...ContextComponents);
            return <Component {...props} />;
        };

const compose = (ChildComponent: any, ...ContextComponents: any[]): any => {
    const Contexts = ContextComponents;
    const Context = Contexts.pop();

    const Component = (props: any) => (
        <Context {...props}>
            <ChildComponent {...props} />
        </Context>
    );

    return Contexts.length === 0 ? Component : compose(Component, ...Contexts);
};

export default ContextComposer;
