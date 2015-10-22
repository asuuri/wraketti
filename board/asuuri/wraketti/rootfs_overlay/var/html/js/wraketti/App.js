define(
    'wraketti/App',
    [
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!wraketti/_templates/App.html',
    'wraketti/Lock'
], function(
    declare,
    WidgetBase,
    TemplatedMixin,
    WidgetsInTemplateMixin,
    template
){
    return declare(
        'wraketti.App',
        [WidgetBase, TemplatedMixin, WidgetsInTemplateMixin],
        {
            templateString: template,

            postCreate: function() {
                this.lockNode.lock();
            },

            _lockOpened: function() {

            },

            _lauch: function() {
                this.lockNode.lock();
            }
        }
    );
});