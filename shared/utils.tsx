export const isServer = () => !(typeof window !== "undefined" && window.document)
export const isPWA = () => {
    if (!isServer()) {
        if (window.matchMedia('(display-mode: fullscreen)').matches) {
            return true
        }
    }
    return false
}

export const isProduction = () => {
    if (!isServer()) {
        if ((window as any).__PRODUCTION__.production) {
            return true
        }
    }
    return false
}
