export interface authBody {
  email: string;
  password: string;
}

export interface verifyBody {
  token: string | null;
}

export interface resetEmailBody {
  email: string | null;
}

export interface resetBody {
  token: string | null;
  password: string | null;
}