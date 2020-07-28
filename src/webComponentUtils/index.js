const React = require('react');
const ReactDOM = require('react-dom');
const retargetEvents = require('react-shadow-dom-retarget-events');
const getStyleElementsFromReactWebComponentStyleLoader = require('./getStyleElementsFromReactWebComponentStyleLoader');
const extractAttributes = require('./extractAttributes');

require('@webcomponents/shadydom');
require('@webcomponents/custom-elements');

/**
* @param {JSX.Element} app
* @param {string} tagName - The name of the web component. Has to be minus "-" delimited.
* @param {string[]} [events=[]] - The register events for listen on custom element.
* @param {boolean} useShadowDom - If the value is set to "true" the web component will use the `shadowDom`. The default value is true.
*/
module.exports = function createCustomElement(app, tagName, events = [], useShadowDom = false) {
    const lifeCycleHooks = {
        attachedCallback: 'webComponentAttached',
        connectedCallback: 'webComponentConnected',
        disconnectedCallback: 'webComponentDisconnected',
        attributeChangedCallback: 'webComponentAttributeChanged',
        adoptedCallback: 'webComponentAdopted'
    };

    function callConstructorHook(appInstance, webComponentInstance) {
        if (appInstance['webComponentConstructed']) {
            appInstance['webComponentConstructed'].apply(appInstance, [webComponentInstance])
        }
    }

    function callLifeCycleHook(appInstance, hook, params) {
        const instanceParams = params || [];
        const instanceMethod = lifeCycleHooks[hook];
        if (instanceMethod && appInstance && appInstance[instanceMethod]) {
            appInstance[instanceMethod].apply(appInstance, instanceParams);
        }
    }

    function registerEvents(app, webComponentInstance, events) {
        const tempApp = { ...app };
        tempApp.props = { ...app.props };
        events.forEach(eventName => {
            tempApp.props[eventName] = (value, cb) => {
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
                styles.forEach((style) => {
                    shadowRoot.appendChild(style.cloneNode(shadowRoot));
                });

                shadowRoot.appendChild(mountPoint);

                retargetEvents(shadowRoot);
            }
            
            const tempApp = registerEvents(app, webComponentInstance, events);
            const attr = extractAttributes(webComponentInstance);
            const ele = React.cloneElement(tempApp, attr);
            
            ReactDOM.render(ele, mountPoint, function () {
                callConstructorHook(this, webComponentInstance);
                callLifeCycleHook(this, 'connectedCallback');
            });
        }
        disconnectedCallback() {
            callLifeCycleHook('disconnectedCallback');
        }
        attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
            callLifeCycleHook('attributeChangedCallback', [attributeName, oldValue, newValue, namespace]);
        }
        adoptedCallback(oldDocument, newDocument) {
            callLifeCycleHook('adoptedCallback', [oldDocument, newDocument]);
        }
    };
    customElements.define(tagName, proto);
};