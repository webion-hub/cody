import * as Login from './login';
import * as Logout from './logout';
import * as Register from './register';
import * as State from './state';
import * as Theme from './theme';
import * as Organizations from './organizations';
import * as BookmarkedOrganizations from './bookmarked_organizations';

export class User {
  static logout = Logout.logout;
  static tryLogin = Login.tryLogin;
  static tryRegister = Register.tryRegister;
  static tryLoginWithCookie = Login.tryLoginWithCookie;

  static isLogged = State.isLogged;
  static existsWith = State.existsWith;
  static sendNewVerificationEmail = State.sendNewVerificationEmail;

  static setThemeColor = Theme.setThemeColor;
  static getThemeColor = Theme.getThemeColor;

  static join = Organizations.join;
  static leave = Organizations.leave;
  static getRoleIn = Organizations.getRoleIn;
  static getJoinedOrganizations = Organizations.getJoinedOrganizations;

  static addBookmarkedOrganization = BookmarkedOrganizations.addBookmarkedOrganization;
  static removeBookmarkedOrganization = BookmarkedOrganizations.removeBookmarkedOrganization;
  static getBookmarkedOrganizations = BookmarkedOrganizations.getBookmarkedOrganizations;
}