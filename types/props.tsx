export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  permission: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  _id: string;
  schlor_no: string;
  name: string;
  withdrawl: boolean;
  f_name: string;
  m_name: string;
  dob: string;
  sex: "M" | "F";
  category: "GEN" | "OBC" | "ST" | "SC" | "EWS";
  religion: "Hindu" | "Muslim" | "SIKH";
  year_10th: number;
  board_10th: "RBSE" | "CBSE" | "WBBSE";
  per_10th: number;
  year_12th: number;
  board_12th: "RBSE" | "CBSE" | "WBBSE";
  sub_12th: string;
  per_12th: number;
  mobile_no_self: number;
  mobile_no_alt: number;
  email_id: string;
  address: string;
  bca_1st_y_per: number;
  bca_2nd_y_per: number;
  bca_3rd_y_per: number;
}
