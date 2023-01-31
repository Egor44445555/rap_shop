let myMap,
    objectManager,
    placemarkCollections = {},
    placemarkList = {},
    geoObjects = [],
    shopList,
    jsonPath = '../js/shops.json';

function getJson() {
    return $.getJSON(jsonPath).done(new Promise(resolve => { resolve(); }));
}

async function currentArr() {
    let data = await getJson();
    shopList = data.shops;
}
currentArr();
 
ymaps.ready(init);
 
function init() {

    myMap = new ymaps.Map("map", {
        center: [59.938536, 30.323324],
        zoom: 10,
        controls: [
            'zoomControl'
        ],
        zoomMargin: [20]
    });

    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-size: 16px;">{{ properties.geoObjects.length }}</div>'
    ),
    clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: '../images/icons/claster.svg',
                size: [45, 45],
                offset: [-20, -20]
            },
            {
                href: '../images/icons/claster.svg',
                size: [60, 60],
                offset: [-30, -30]
            }
        ],
        clusterIconContentLayout: MyIconContentLayout,
        groupByCoordinates: false,
        clusterDisableClickZoom: false,
        clusterHideIconOnBalloonOpen: true,
        geoObjectHideIconOnBalloonOpen: true
    }),
    MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        `<div class="balloon-wrap">
            <a class="close" href="#"></a>
            $[[options.contentLayout observeSize minWidth=540 maxWidth=540 maxHeight=450]]
        </div>
        `,
        {
            build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = $('.balloon-wrap', this.getParentElement());
                this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
                this.applyElementOffset();
            },
            clear: function () {
                this._$element.find('.close').off('click');
                this.constructor.superclass.clear.call(this);
            },
            onSublayoutSizeChange: function () {
                MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                if(!this._isElement(this._$element)) {
                    return;
                }

                this.applyElementOffset();
                this.events.fire('shapechange');
            },
            onCloseClick: function (e) {
                e.preventDefault();

                this.events.fire('userclose');
            },
            applyElementOffset: function () {

                // this._$element.css({
                //     left: -(this._$element[0].offsetWidth / 2 + 200),
                //     top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                // });
            },
            getShape: function () {

                if(!this._isElement(this._$element)) {
                    return MyBalloonLayout.superclass.getShape.call(this);
                }

                let position = this._$element.position();

                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                    [position.left, position.top], [
                        position.left + this._$element[0].offsetWidth,
                        position.top + this._$element[0].offsetHeight
                    ]
                ]));
            },
            _isElement: function (element) {
                return element && element[0];
            }
        });
 
    for (let i = 0; i < shopList.length; i++) {

        let cityCollection = new ymaps.GeoObjectCollection();
        let shopPlacemark = '';
 
        for (let c = 0; c < shopList[i].shops.length; c++) {
            let shopInfo = shopList[i].shops[c];
 
            shopPlacemark = new ymaps.Placemark(
                shopInfo.coordinates,
                {
                    balloonContent: `
                        <div class="balloon-custom">
                            <div class="wrap">
                                <div class="logo"><img src="images/logo.png" alt=""></div>
                                <div class="title">${shopInfo.title_baloon}</div>
                                <div class="text">${shopInfo.text_baloon}</div>
                            </div>
                            <div class="arrow"><img src="images/icons/arrow-balloon.png" alt=""></div>
                        </div>`,
                },
                {
                    balloonLayout: MyBalloonLayout,
                    iconLayout: 'default#image',
                    iconImageHref: '../images/icons/marker.svg',
                    iconImageSize: [44, 44],
                }
            );

            if (!placemarkList[i]) {
                placemarkList[i] = {};
            }

            geoObjects.push(shopPlacemark);
        }

        cityCollection.add(shopPlacemark);
        placemarkCollections[i] = cityCollection;
    }

    myMap.behaviors.disable('scrollZoom');

    for (let s = 0; s < geoObjects.length; s++) {
        clusterer.add(geoObjects[s]);
    }

    myMap.geoObjects.add(clusterer);

    // myMap.setBounds(clusterer.getBounds(), {
    //     checkZoomRange: false
    // });


    /***/

    objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true
    });

    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);
}
