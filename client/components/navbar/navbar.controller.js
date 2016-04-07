'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',    
    'state': 'main'
  },
  // {
  //   'title': 'Map',    
  //   'state': 'explorer'
  // },
  {
    'title': 'Data',    
    'state': 'data'
  },
  {
    'title': 'Feedback',    
    'state': 'feedback'
  },
  {
    'title': 'About',    
    'state': 'about'
  }];

  isCollapsed = true;
  //end-non-standard
  
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('capvmtApp')
  .controller('NavbarController', NavbarController);
