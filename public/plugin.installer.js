(function installPlugin() {
    // const mainScript = document.createElement('script');
    // mainScript.src = '/static/js/main.chunk.js';
    // const venderScript = document.createElement('script');
    // venderScript.src = '/static/js/2.chunk.js';
    // document.body.appendChild(mainScript);
    // document.body.appendChild(venderScript);

    const rootEle = document.getElementById('root');
    const entryEle = document.createElement('plugin-command-a-entry');
    entryEle.addEventListener('clickEvent', (e) => {
        console.log('Catched event on listener: ', e.detail.value);
        setTimeout(() => {
            e.detail.cb('You clicked me');
        }, 500);
    });
    entryEle.setAttribute('name', 'Hello Input name');
    rootEle.appendChild(entryEle);
})();