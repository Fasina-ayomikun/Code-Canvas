export default (file: Blob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.addEventListener("load", () => {
            resolve(fileReader.result);
        });

        fileReader.addEventListener("error", (error) => {
            reject(error);
        })
    })
}