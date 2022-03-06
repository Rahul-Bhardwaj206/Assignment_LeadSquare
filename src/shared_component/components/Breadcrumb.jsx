import React, { Fragment } from "react";
import { Icon } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import MailIcon from '@material-ui/icons/Mail';

const Breadcrumb = ({ routeSegments }) => {
  return (
    <div className="flex flex-middle position-relative">
      {routeSegments ? (
        <Fragment>
          <h4 className="m-0 pb-2 font-size-14 capitalize text-middle">
            {routeSegments[routeSegments.length - 1]["name"]}
          </h4>
        </Fragment>
      ) : null}

      {routeSegments
        ? routeSegments.map((route, index) => (
          <Fragment key={index}>
            <Icon className="text-hint">navigate_next</Icon>
            {index !== routeSegments.length - 1 ? (
              <NavLink to={route.path}>
                <span className="capitalize text-muted">{route.name}</span>
              </NavLink>
            ) : (
              <div className="flex flex-middle position-relative element-spacing">
                <h6 className="m-0 font-size-14 text-muted">24</h6><MailIcon className="text-muted"/><h6 className="m-0 font-size-14 text-muted">{route.detail}</h6>
              </div>
            )}
          </Fragment>
        ))
        : null}
    </div>
  );
};

export default Breadcrumb;
