'use strict';

define([
    'postmonger'
], function(
    Postmonger
) {

    // Vars
    var connection = new Postmonger.Session();
    var toJbPayload = {};

    function getCode() {
        console.log('[get code] : Editor Value ' , editor.getValue());
        return editor.getValue();
        // return $( '#code-content-textarea' ).val().trim();
    }

    function isValidCode() {
        return  getCode().length > 10;
    }

    // function getParseAsJson() {
    //     return $( '#parse-output-as-json-checkbox' ).is( ':checked' );
    // }

    function onRender() {
        connection.trigger( 'ready' );

        // connection.trigger( 'requestTokens' );
        // connection.trigger( 'requestEndpoints' );
        
        // connection.trigger('requestTriggerEventDefinition');

        // connection.trigger('requestDataSources');
        // connection.trigger('requestContactsSchema');


        // Disable the next button if a valid value has not been selected
        // $( '#code-content-textarea' ).on('change keyup paste', function() {
        //     connection.trigger( 'updateButton', { button: 'next', text: 'done', enabled: Boolean( isValidCode() ) } );
        // });
        editor.on('change', function() {
            connection.trigger( 'updateButton', { button: 'next', text: 'done', enabled: Boolean( isValidCode() ) } );
        });
    }

    $( window ).ready( onRender );


    // connection.on( 'initEvent', function( payload ) {
    //     console.log('[Debug]: initEvent : payload ' , payload);
    // });
    
    // connection.on('requestedDataSources', onRequestedDataSources);
    // connection.on('requestedContactsSchema', onRequestedContactsSchema);
    // connection.on('requestedTriggerEventDefinition', onRequestedTriggerEventDefinition);

    // function onRequestedTriggerEventDefinition(payload) {
    //     console.log('onRequestedTriggerEventDefinition ' ,payload);
    // }
    
    // function onRequestedDataSources(payload) {
    //     console.log('onRequestedDataSources ', payload);
    // }

    // function onRequestedContactsSchema(payload) {
    //     console.log('onRequestedContactsSchema ', payload);
    // }

    
    connection.on( 'initActivity', function( payload ) {
        console.log('[Debug]: initActivity : payload ' , payload);

        // Set code to editor
        editor.setValue(payload.arguments.code)

        var code;
        var evalAsJson = false;
        toJbPayload = payload || {};

        //console.log(toJbPayload);

        // get previous code value from the payload if exists
        if ( toJbPayload['arguments'] && toJbPayload['arguments'].code ) {
            code = toJbPayload['arguments'].code;
            var evalAsJsonPayload = toJbPayload['arguments'].parseOutputAsJson;

            if(typeof evalAsJsonPayload === "boolean") {
                evalAsJson = evalAsJsonPayload;
            } else if(typeof evalAsJsonPayload === "string") {
                evalAsJson = (evalAsJsonPayload.toLowerCase() === 'true');
            }
        }

        $( '#code-content-textarea' ).val( code );

        // set previous eval as json checkbox state from payload if exists
        // $( '#parse-output-as-json-checkbox' ).prop( 'checked' , evalAsJson );
        // if(evalAsJson) {
        //     $('#parse-output-as-json-checkbox').checkbox('check');
        // }

        connection.trigger( 'updateButton', { button: 'next', text: 'done', enabled: Boolean( isValidCode() ) } );


        function save() {
            var value = getCode();
            var parseAsJson = false;
            // var parseAsJson = getParseAsJson();

            // toJourneyBuilderPayload is initialized when the 'payload' is provided during initialization of this activity.
            // Journey Builder sends an initial payload with defaults set by this activity's config.json file.
            // Override properties as needed

            toJbPayload.name = 'Code Activity';
            toJbPayload['arguments'].code = value;
            toJbPayload['arguments'].parseOutputAsJson = parseAsJson;

            toJbPayload['metaData'].icon = '';
            toJbPayload['metaData'].isConfigured = true;

            console.log('toJbPayload ', toJbPayload)

            connection.trigger( 'updateActivity', toJbPayload );
        }

        connection.on( 'requestedEndpoints', function( endpoints ) {
        });

        connection.on( 'clickedNext', function() {
            save();
            connection.trigger( 'ready' );
        });
    });
});
