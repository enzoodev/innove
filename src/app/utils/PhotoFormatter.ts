export class PhotoFormatter {
  public static getFileType = (extension: string) => {
    const lowerCaseExtension = extension.toLowerCase();

    if (lowerCaseExtension === 'pdf') {
      return `application/${lowerCaseExtension}`;
    }

    return `image/${lowerCaseExtension}`;
  };

  public static formatUri = (photo?: TFile) => {
    if (!photo) return '';

    const fileType = this.getFileType(photo.extension);
    return `data:${fileType};base64,${photo.file}`;
  };
}
