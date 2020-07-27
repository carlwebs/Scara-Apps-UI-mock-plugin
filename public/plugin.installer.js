(function installPlugin() {
    // const mainScript = document.createElement('script');
    // mainScript.src = '/static/js/main.chunk.js';
    // const venderScript = document.createElement('script');
    // venderScript.src = '/static/js/2.chunk.js';
    // document.body.appendChild(mainScript);
    // document.body.appendChild(venderScript);

    const pluginEle = document.createElement('mock-plugin');
    const rootEle = document.getElementById('root');
    rootEle.appendChild(pluginEle);
})();