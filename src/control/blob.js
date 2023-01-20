export default class BlobFiles {
    static async fileToBlob(file) {
        const b64 = await BlobFiles.blobTob64(file);
        return BlobFiles.b64toBlob(b64, file.size);
    }

    static async blobTob64(blobOrFile) {
        const reader = new FileReader();
        reader.readAsDataURL(blobOrFile);
        return new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
        });
    }
    
    static b64ArrayToBlob(array) {
        const newArr = [];
        array.forEach((item) => {
          const blob = BlobFiles.b64toBlob(item.base, item.size);
          newArr.push(blob);
        });
        return newArr;
    }
    
      // function on: https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    static b64toBlob(dataUrl, sliceSize) {
        let a; let b; let c; let
          d;
        [a, b] = dataUrl.split(','); [c, d] = a.split(';'); [d, a] = c.split(':');
        const b64Data = [b];
        const contentType = a;
        sliceSize = sliceSize || 512;
    
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
    
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
    
          const byteArray = new Uint8Array(byteNumbers);
    
          byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
}