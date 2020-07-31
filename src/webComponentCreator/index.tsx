import React from 'react';
import ReactDOM from 'react-dom'; import {
    getStyleElementsFromReactWebComponentStyleLoader,
    extractAttributes
} from './adjunct';
require('@webcomponents/shadydom');
require('@webcomponents/custom-elements');

// eslint-disable-next-line
const retargetEvents = require('react-shadow-dom-retarget-events');

/**
* @param {JSX.Element} app
* @param {string} tagName - The name of the web component. Has to be minus "-" delimited.
* @param {string[]} [events=[]] - The register events for listen on custom element.
* @param {boolean} useShadowDom - If the value is set to "true" the web component will use the `shadowDom`. The default value is true.
*/
export default function defineCustomElement(app: any, tagName: string, events: string[] = [], useShadowDom = false) {
    const lifeCycleHooks: any = {
        attachedCallback: 'attachedCallback',
        connectedCallback: 'connectedCallback',
        disconnectedCallback: 'disconnectedCallback',
        attributeChangedCallback: 'attributeChangedCallback',
        adoptedCallback: 'adoptedCallback'
    };

    function callConstructorHook(appInstance: any, webComponentInstance: any) {
        if (appInstance['webComponentConstructed']) {
            appInstance['webComponentConstructed'].apply(appInstance, [webComponentInstance])
        }
    }

    function callLifeCycleHook(appInstance: any, hook?: any, params?: any) {
        const instanceParams = params || [];
        const instanceMethod = lifeCycleHooks[hook];
        if (instanceMethod && appInstance && appInstance[instanceMethod]) {
            appInstance[instanceMethod].apply(appInstance, instanceParams);
        }
    }

    function registerEvents(app: any, webComponentInstance: any, events: any) {
        const tempApp = { ...app };
        tempApp.props = { ...app.props };
        events.forEach((eventName: string) => {
            tempApp.props[eventName] = (value: string, cb: Function) => {
                const customEvent = new CustomEvent(eventName, {
                    detail: { value, cb }
                });
                webComponentInstance.dispatchEvent(customEvent);
            };
        });
        return tempApp;
    };

    const proto = class extends HTMLElement {
        connectedCallback() {
            const webComponentInstance = this;
            const mountPoint = useShadowDom ? document.createElement('div') : webComponentInstance;

            if (useShadowDom) {
                // Re-assign the webComponentInstance (this) to the newly created shadowRoot
                const shadowRoot = webComponentInstance.attachShadow({ mode: 'open' });

                // Move all of the styles assigned to the react component inside of the shadowRoot.
                // By default this is not used, only if the library is explicitly installed
                const styles = getStyleElementsFromReactWebComponentStyleLoader();
                styles.forEach((style: any) => {
                    shadowRoot.appendChild(style.cloneNode(shadowRoot));
                });

                shadowRoot.appendChild(mountPoint);

                retargetEvents(shadowRoot);
            }

            const tempApp = registerEvents(app, webComponentInstance, events);
            const attr = extractAttributes(webComponentInstance);
            const ele = React.cloneElement(tempApp, attr);

            ReactDOM.render(ele, mountPoint, function (this: typeof HTMLElement) {
                if (!this) return;
                callConstructorHook(this, webComponentInstance);
                callLifeCycleHook(this, lifeCycleHooks.connectedCallback);
            });
        }

        disconnectedCallback() {
            callLifeCycleHook(lifeCycleHooks.disconnectedCallback);
        }

        attributeChangedCallback(attributeName: any, oldValue: any, newValue: any, namespace: any) {
            callLifeCycleHook(lifeCycleHooks.attributeChangedCallback, [attributeName, oldValue, newValue, namespace]);
        }

        adoptedCallback(oldDocument: any, newDocument: any) {
            callLifeCycleHook(lifeCycleHooks.adoptedCallback, [oldDocument, newDocument]);
        }
    };
    customElements.define(tagName, proto);
};