import PropTypes from "prop-types";

import { Helmet, HelmetProvider } from "react-helmet-async";

const MetaData = ({ title = "title" }) => {
    return (
        <HelmetProvider>
        <Helmet>
            <title>{`${title} | Restro`}</title>
        </Helmet>
    </HelmetProvider>
    );
};

// Props Validation
MetaData.propTypes = {
    title: PropTypes.string,
};

export default MetaData;