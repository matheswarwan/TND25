requirejs.config({
    paths: {
        'jquery': '../../vendor/jquery',
        'bootstrap': '../../vendor/bootstrap/js/bootstrap',
        'fuelux': '../../vendor/fuelux/js/fuelux.min',
        'postmonger': '../../vendor/postmonger',
        'moment': '../../vendor/moment-with-locales', // comment out if you dont want momentjs to be default
        'CodeActivity': './codeActivity'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'bootstrap': {
          deps: ['jquery']
        },
        'codeActivity': {
            deps: ['jquery', 'bootstrap', 'fuelux', 'postmonger']
        }
    }
});

requirejs( ['jquery', 'codeActivity'], 
    function( $, CodeActivity ) {
    //console.log( 'REQUIRE LOADED' );
});

requirejs.onError = function( err ) {
    //console.log( "REQUIRE ERROR: ", err );
    if( err.requireType === 'timeout' ) {
        console.log( 'modules: ' + err.requireModules );
    }

    throw err;
};
