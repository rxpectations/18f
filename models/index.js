'use strict';


module.exports = function IndexModel() {
    function Index() {
        return {
            title: 'Index'
        };
    }

    function Styleguide() {
        return {
            title: 'Styleguide'
        };
    }

    return {
        Styleguide: Styleguide,
        Index: Index
    }
    
};
