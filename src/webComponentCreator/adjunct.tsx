export const getStyleElementsFromReactWebComponentStyleLoader = () => {
    try {
        // tslint-disable-next-line
        return require('react-web-component-style-loader/exports').styleElements;
    } catch (e) {
        return [];
    }
};

export const extractAttributes = (nodeMap: any) => {
    if (!nodeMap.attributes) {
        return {};
    }
    let obj: any = {};
    let attribute: any;
    const attributesAsNodeMap = [...nodeMap.attributes];
    const attributes = attributesAsNodeMap.map((attribute) => ({ [attribute.name]: attribute.value }));

    for (attribute of attributes) {
        const key = Object.keys(attribute)[0];
        const camelCasedKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        obj[camelCasedKey] = attribute[key];
    }
    return obj;
};