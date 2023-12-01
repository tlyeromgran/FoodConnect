export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "Activity",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "Create Post",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/tracking.png",
    route: "/tracking",
    label: "Tracking",
  },
  {
    imgURL: "/assets/trays.png",
    route: "/restaurants",
    label: "Restaurants",
  }
];

export const profileTabs = [
  // Need to change to "posts" later
  { value: "threads", label: "Posts", icon: "/assets/reply.svg" },

];

export const communityTabs = [
  { value: "threads", label: "Posts", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];

const CategoryListData = [
  {
      id:1,
      name:'Restaurants',
      value:'restaurant',
      icon:'/food.png'
  },
  {
      id:2,
      name:'Cafe',
      value:'cafe',
      icon:'/cafe.png'
  },
  {
      id:3,
      name:'Gas Station',
      value:'gas_station',
      icon:'/gas.png'
  }
];
export default { CategoryListData };
