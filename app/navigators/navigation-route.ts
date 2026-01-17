export type AdminStackParamList = {
  ['AdminDashboard']: undefined;
  ['ManageCars']: undefined;
  ['AddCar']: undefined;  
  ['ViewBookings']: undefined;
  ['UserMessages']: undefined;
  ['ManageUsers']: undefined;
  ['AdminChatScreen']: undefined;
};

export type NavigatorParamList = {
  ['OnBoardingScreen']: undefined;
  ['OnBoardingScreenTwo']: undefined;
  ['SignInScreen']: undefined;
  ['SignUpScreen']: undefined;
  ['ResetScreen']: undefined;
  ['HomeScreen']: undefined;
  ['tabStack']: undefined;
  ['SearchScreen']: undefined;
  ['ProfileScreen']: undefined;
  ['NotificationScreen']: undefined;
  ['MessageScreen']: undefined;
  ['CarScreen']: undefined;
  ['rootStack']: undefined;
  ['ReviewScreen']: undefined;
  ['BookingScreen']: undefined;
  ['BookingPaymentScreen']: undefined;
  ['BookingConfirmationScreen']: undefined;
  ['BookingStatusScreen']: undefined;
  ['EditScreen']: undefined;
  ['ChatScreen']: undefined;
  ['AdminStack']:{ screen: keyof AdminStackParamList; params?: undefined;}
};

export type ScreenName = keyof NavigatorParamList;
