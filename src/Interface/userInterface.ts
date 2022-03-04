export interface validateUser {
  firstName: String;
  lastName: String;
  userName: String;
  phone: String;
  accountVerified: Boolean,
  verificaticationToken:String,
  profilePicture?: String;
  verifiedEmail: String;
  email?: String;
  password: String;
  confirmPassword: String;
}

export interface validateOrganization {
  OrganizationName: String;
  location: String;
  phone1: String;
  phone2?: String;
  email:String,
  logo?: String,
  websiteUrl?:String,
  description?: String;
}