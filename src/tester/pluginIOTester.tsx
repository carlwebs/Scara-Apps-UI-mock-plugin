import React from 'react';

export class PluginIOTester extends React.Component {

    private hostRef: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.hostRef = React.createRef<HTMLDivElement>();
    }

    public componentDidMount(): void {
        const { current: hostEle } = this.hostRef;
        const customizeEle = document.createElement('plugin-io-main-view');
        hostEle?.appendChild(customizeEle);
    }

    public render(): JSX.Element {
        return (
            <div ref={this.hostRef}></div>
        );
    }
}