define(
    'wraketti/Lock',
    [
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/Evented',
    'dojo/text!wraketti/_templates/Lock.html',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/on',
    'dojo/_base/fx'
], function(
    declare,
    WidgetBase,
    TemplatedMixin,
    Evented,
    template,
    array,
    lang,
    domConstruct,
    domClass,
    on,
    fx
){
    var COUNT = 4;

    return declare(
        'wraketti.Lock',
        [WidgetBase, TemplatedMixin, Evented],
        {
            templateString: template,

            charSet: '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ',

            lockKey: '',

            incomingKey: '',

            _shuffle: function() {
                var index;
                var limit = this.charSet.length;
                var result = [];

                for(index = 0; index < COUNT; index++) {
                    var charIndex = Math.floor(Math.random() * limit);
                    result.push(this.charSet[charIndex]);
                }

                return result;
            },

            _buttonPressed: function(evt) {
                var button = evt.target;
                domClass.add(button, 'wrk_button_pressed');

                this.incomingKey += button.value;

                this._check();
            },

            _check: function() {
                if (this.lockKey === this.incomingKey) {
                    this.hide();
                    this.emit('open', {});
                } else if (this.incomingKey.length === COUNT) {
                    this.lock();
                    fx.animateProperty({
                        node: this.overlayNode,
                        properties: {
                            backgroundColor: {start: 'rgb(180, 0, 0, 0.8)', end: 'rgb(255, 255, 255)'}
                        }
                    }).play();
                }
            },

            show: function() {
                domClass.remove(this.domNode, 'wrk_lock_hiden');
            },

            hide: function() {
                domClass.add(this.domNode, 'wrk_lock_hiden');
            },

            lock: function() {
                var chars = this._shuffle();

                this.incomingKey = '';
                domConstruct.empty(this.buttonsNode);

                array.forEach(
                    chars,
                    lang.hitch(this, function(char) {
                        var button = domConstruct.create(
                            'button',
                            {
                                class: 'wrk_button',
                                innerHTML: char,
                                value: char
                            },
                            this.buttonsNode
                        );

                        on.once(button, 'click', lang.hitch(this, '_buttonPressed'));
                    })
                );

                this.lockKey = chars.sort().join('');

                this.show();

                return this;
            }
        }
    );
});