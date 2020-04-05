import Home from "../pages/Home/Home";
import {Redirect} from "react-router";
import React from "react";
import Recommend from "../pages/Recommend";
import Singers from "../pages/Singers";
import Rank from "../pages/Rank";

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={'/recommend'}/>
      },
      {
        path: '/recommend',
        component: Recommend
      },
      {
        path: '/singers',
        component: Singers
      },
      {
        path: '/rank',
        component: Rank
      }
    ]
  }
]