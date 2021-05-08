const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },{
    path: ["/find-donar"],
    exact: true,
    component: "FindDonar",
  },{
    path: ["/profile"],
    exact: true,
    component: "profile",
  },{
    path: ["/form-donar"],
    exact: true,
    component: "formDonar",
  },{
    path: ["/form-patient"],
    exact: true,
    component: "formPatient",
  },
];

export default routes;
