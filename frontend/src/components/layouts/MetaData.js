import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title })  => {
  return <Helmet>
    <title>{`${title} Med Shop Online`}</title>
  </Helmet>;
};

export default MetaData;
