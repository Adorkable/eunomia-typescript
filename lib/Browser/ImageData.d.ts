export declare const saveImageDataToFile: (imageData: string, fileName: string) => void;
declare global {
    interface Navigator {
        msSaveOrOpenBlob: (blob: Blob, defaultName: string) => void;
    }
}
export declare const saveImageStateToFile: (imageState: Object, fileName: string) => void;
