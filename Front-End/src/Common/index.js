const backEndDomin = "http://localhost:3000";

export const summaryApi = {
  signUp: {
    url: `${backEndDomin}/api/v1/register`,
    method: "post",
  },
  login: {
    url: `${backEndDomin}/api/v1/login`,
    method: "post",
  },
  logout: {
    url: `${backEndDomin}/api/v1/logout`,
    method: "post",
  },
  forgetpass: {
    url: `${backEndDomin}/api/v1/forgetpass`,
    method: "post",
  },
  resetPass: {
    url: `${backEndDomin}/api/v1/resetPass`,
    method: "post",
  },

  adminAllpost: {
    url: `${backEndDomin}/api/v1/adminAllPost`,
  },
  allProducts: {
    url: `${backEndDomin}/api/v1/products`,
  },
  updatePost: {
    url: `${backEndDomin}/api/v1/update/`,
  },
  deletePost: {
    url: `${backEndDomin}/api/v1/delete/`,
  },

  checkuser: {
    url: `${backEndDomin}/api/v1/userinfo`,
    method: "get",
  },
  changePass: {
    url: `${backEndDomin}/api/v1/changePass`,
    method: "get",
  },
  singleUser: {
    url: `${backEndDomin}/api/v1/singleuser/`,
    method: "get",
  },
  AdminUsers: {
    url: `${backEndDomin}/api/v1/adminUsers`,
    method: "get",
  },
  updateUserByadmin: {
    url: `${backEndDomin}/api/v1/updateByAdmin/`,
  },
  deleteUser: {
    url: `${backEndDomin}/api/v1/deleteuser/`,
  },
  updateUser: {
    url: `${backEndDomin}/api/v1/updateUser`,
  },

  createPost: {
    url: `${backEndDomin}/api/v1/add/`,
    method: "post",
  },
  singlePost: {
    url: `${backEndDomin}/api/v1/getbyId/`,
    method: "post",
  },
  commentPost: {
    url: `${backEndDomin}/api/post/addcomment/`,
    method: "post",
  },
  createReview: {
    url: `${backEndDomin}/api/v1/createReview`,
    method: "post",
  },
  getReview: {
    url: `${backEndDomin}/api/v1/getReview/`,
    method: "post",
  },
  deleteReview: {
    url: `${backEndDomin}/api/v1/deleteReview`,
    method: "post",
  },
  createOrder: {
    url: `${backEndDomin}/api/v1/createOrder`,
    method: "post",
  },
  getAllOrder: {
    url: `${backEndDomin}/api/v1/getAllOrder`,
    method: "post",
  },
  orderDetails: {
    url: `${backEndDomin}/api/v1//oderDetail/`,
    method: "post",
  },
  updateOrder: {
    url: `${backEndDomin}/api/v1/updateOrder/`,
    method: "post",
  },
  myOrders: {
    url: `${backEndDomin}/api/v1/myOrders`,
    method: "post",
  },
  deleteOrder: {
    url: `${backEndDomin}/api/v1/deleteOrder/`,
  },
  replyComment: {
    url: `${backEndDomin}/api/post/addreply/`,
    method: "post",
  },
  addlikecommnet: {
    url: `${backEndDomin}/api/post/addlikecommnet/`,
    method: "post",
  },
  getSuggestFriend: {
    url: `${backEndDomin}/api/user/suggestUser/`,
    method: "get",
  },
  sendFriendreq: {
    url: `${backEndDomin}/api/user/sendFriendreq/`,
    method: "get",
  },
  getpendingfriend: {
    url: `${backEndDomin}/api/user/getpendingfriend/`,
    method: "get",
  },
  cencelreq: {
    url: `${backEndDomin}/api/user/cencelreq/`,
    method: "get",
  },
  acceptreq: {
    url: `${backEndDomin}/api/user/acceptreq/`,
    method: "get",
  },
  addStory: {
    url: `${backEndDomin}/api/user/addStory/`,
    method: "post",
  },
  getStory: {
    url: `${backEndDomin}/api/user/getstory/`,
    method: "post",
  },
};
