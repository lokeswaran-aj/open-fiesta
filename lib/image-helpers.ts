export const imageHelpers = {
  base64ToBlob: (base64Data: string, type = "image/png"): Blob => {
    const byteString = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type });
  },

  generateImageFileName: (): string => {
    const uniqueId = Math.random().toString(36).substring(2, 8);
    return `open-fiesta-${uniqueId}`.replace(/[^a-z0-9-]/gi, "");
  },

  downloadImage: (imageData: string): void => {
    const fileName = imageHelpers.generateImageFileName();
    const blob = imageHelpers.base64ToBlob(imageData);
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  },

  formatModelId: (modelId: string): string => {
    return modelId.split("/").pop() || modelId;
  },
};
