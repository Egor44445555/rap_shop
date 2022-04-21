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
    });
 
    for (let i = 0; i < shopList.length; i++) {

        let cityCollection = new ymaps.GeoObjectCollection();
        let shopPlacemark = '';
 
        for (let c = 0; c < shopList[i].shops.length; c++) {
            let shopInfo = shopList[i].shops[c];
 
            shopPlacemark = new ymaps.Placemark(
                shopInfo.coordinates,
                {
                    hintContent: shopInfo.name_tooltip,
                    balloonContent: shopInfo.name_tooltip,
                    balloonContentHeader: shopInfo.title_baloon,
                    balloonContentBody: shopInfo.text_baloon,
                    balloonContentFooter: shopInfo.footer_baloon
                },
                {
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
