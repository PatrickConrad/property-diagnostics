export const setImage = (src: string) => {
    const img = new Image();
    img.src = src
    return img
}