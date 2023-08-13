class CommonUtils {

    //convert file sang Base64
    static getBase64(file) {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result);
            reader.onerror = (Error) => reject(Error)
        })
    }
}

export default CommonUtils;