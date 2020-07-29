export function getCustomEvent(name: string, callback: Function) {
    document.addEventListener(name, (e: any) => {
        callback(e.detail);
    })
}