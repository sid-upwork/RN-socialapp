import { Dimensions, Platform } from "react-native";
const { width } = Dimensions.get("window");

function sizeWithRespectToScreen(size) {
  return Platform.OS === 'ios' ? parseInt(size) * width / 355 :parseInt(size) * width / 400 ;
}

export const Dimens = {
  minusMargin: sizeWithRespectToScreen(-170),
  minusThirty: sizeWithRespectToScreen(-10),
  minusTwenty: sizeWithRespectToScreen(-20),

  //TextSize
  headerSize: sizeWithRespectToScreen(19),
  headingTextSize: sizeWithRespectToScreen(20),
  extraLargerTextSize: sizeWithRespectToScreen(18),
  largeTextSize: sizeWithRespectToScreen(17),
  mediumTextSize: sizeWithRespectToScreen(16),
  smallTextSize: sizeWithRespectToScreen(15),
  extraSmallTextSize: sizeWithRespectToScreen(14),
  tinyTextSize: sizeWithRespectToScreen(13),

  //IconSize 
  extraLargeIconSize: sizeWithRespectToScreen(35),
  largeIconSize: sizeWithRespectToScreen(30),
  mediumIconSize: sizeWithRespectToScreen(25),
  smallIconSize: sizeWithRespectToScreen(20),
  extraSmallIconSize: sizeWithRespectToScreen(18),
  tinyIconSize: sizeWithRespectToScreen(15),

  //ImageSize
  headerImageSize: sizeWithRespectToScreen(40),
  postImageSize: sizeWithRespectToScreen(60),
  commentImageSize: sizeWithRespectToScreen(60),
  drawerImageSize: sizeWithRespectToScreen(70),
  editProfileImageSize: sizeWithRespectToScreen(80),
  postCommentSize: sizeWithRespectToScreen(50),

  //ImageRadius
  headerImageBorderRadius: sizeWithRespectToScreen(20),
  postImageBorderRadius: sizeWithRespectToScreen(30),
  commentImageBorderRadius: sizeWithRespectToScreen(30),
  drawerImageBorderRadius: sizeWithRespectToScreen(35),
  editProfileImageBorderSize: sizeWithRespectToScreen(40),
  postCommentBorderRadius: sizeWithRespectToScreen(25),

  //Divider 
  dividerHeight: sizeWithRespectToScreen(1),

  //
  floatingButtonRadius: sizeWithRespectToScreen(55 / 2),
  floatingButtonSize: sizeWithRespectToScreen(55),

  //dimens
  zero: sizeWithRespectToScreen(0),
  one: sizeWithRespectToScreen(1),
  oneAndHalf: sizeWithRespectToScreen(1.5),
  two: sizeWithRespectToScreen(2),
  three: sizeWithRespectToScreen(3),
  four: sizeWithRespectToScreen(4),
  five: sizeWithRespectToScreen(5),
  seven: sizeWithRespectToScreen(7),
  eight: sizeWithRespectToScreen(8),
  ten: sizeWithRespectToScreen(10),
  tweleve: sizeWithRespectToScreen(12),
  fifteen: sizeWithRespectToScreen(15),
  sixteen: sizeWithRespectToScreen(16),
  twenty: sizeWithRespectToScreen(20),
  twentyFive: sizeWithRespectToScreen(25),
  thirty: sizeWithRespectToScreen(30),
  thirtyFive: sizeWithRespectToScreen(35),
  fourty: sizeWithRespectToScreen(40),
  fourtyFive: sizeWithRespectToScreen(45),
  fifty: sizeWithRespectToScreen(50),
  sixty: sizeWithRespectToScreen(60),
  seventy: sizeWithRespectToScreen(70),
  eighty: sizeWithRespectToScreen(80),
  ninety: sizeWithRespectToScreen(90),
  hundred: sizeWithRespectToScreen(100),
  oneTen: sizeWithRespectToScreen(110),
  oneTwenty: sizeWithRespectToScreen(120),
  oneFourty: sizeWithRespectToScreen(140),
  oneFifty: sizeWithRespectToScreen(150),
  oneSixty: sizeWithRespectToScreen(160),
  oneSeventy: sizeWithRespectToScreen(170),
  oneNinety: sizeWithRespectToScreen(190),
  twoHundred: sizeWithRespectToScreen(200),
  twoHundredFive: sizeWithRespectToScreen(213),
  twoTwentyTwo: sizeWithRespectToScreen(222),
  twoFourtyEight: sizeWithRespectToScreen(248),
  thousand: sizeWithRespectToScreen(1000),



};
