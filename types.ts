
export interface Style {
  name: string;
  prompt: string;
}

export interface StyleCategory {
  indian: Style[];
  western: Style[];
}

export interface UploadedImage {
    file: File;
    url: string;
}

export interface User {
  name: string;
  avatarUrl: string;
}
