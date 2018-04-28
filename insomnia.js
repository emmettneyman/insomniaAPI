var request = require("request");
var j = request.jar();
request = request.defaults({jar:j});

var storeData = { deliveryType: 4,
                  storeID: 14, 
                  orderTypeID: 2, 
                  deliveryTierLevel: 0};
var currentDate = "2018-04-27";
var timeData = { time: "ASAP", date: currentDate };

var productData = { deliveryMethod: "both",
                    quantity: 4,
                    productID: 4,
                    platform: "website"};

var submittedData = 'shipping_name=Emmett+Neyman&shipping_phone=2159003788&address=101++South+39th+Street%2C+Philadelphia%2C+PA+19104&address_2=D301&instructions=Call+when+here.&comment=&customer_name=Emmett+Neyman&payment_phone=2159003788&payment_email=emmettneyman%40gmail.com&payment_guest=Nope&location_type=off-campus&credit_card=&cash=&schoolcash=&giftcard=&tip=';

var orderData = 'shipping_name=Emmett+Neyman&shipping_phone=2159003788&address=101++South+39th+Street%2C+Philadelphia%2C+PA+19104&address_2=D301&instructions=Call+when+here.&comment=&customer_name=Emmett+Neyman&payment_phone=2159003788&payment_email=emmettneyman%40gmail.com&payment_guest=Nope&location_type=off-campus&credit_card=&cash=&schoolcash=&giftcard=&tip=&payment_email=emmettneyman%40gmail.com&payment_phone=2159003788&order_type=2&address_1=101%20%20South%2039th%20Street&address_2=D301&city=Philadelphia&state=PA&zip=19104&remember_cards=false&width=1280';

var storeRequest = { 
    method: 'POST',
    url: 'https://insomniacookies.com/shop/selectStore',
    body: storeData,
    json: true 
};

var dateTimeRequest = { 
    method: 'POST',
    url: 'https://insomniacookies.com/shop/setDateTime',
    body: timeData,
    json: true 
};

var getCartRequest = {
    method: 'GET',
    url: 'https://insomniacookies.com/shop/getCart',
    json: true
};

var addProductRequest = { 
    method: 'POST',
    url: 'https://insomniacookies.com/shop/addProduct',
    body: productData,
    json: true 
};

var canCheckoutRequest = {
    method: 'GET',
    url: 'https://insomniacookies.com/shop/canCheckout?order_type=2',
    json: true
};

var getPaymentVarsRequest = {
    method: 'GET',
    url: 'https://insomniacookies.com/shop/getPaymentSessionVariables',
    json: true
};

var getTipRequest = {
    method: 'GET',
    url: 'https://insomniacookies.com/shop/getTip',
    json: true
};

var getSchoolcashRequest = {
    method: 'GET',
    url: 'https://insomniacookies.com/shop/getSchoolcash',
    json: true
};

var checkPaymentMethodsRequest = {
    method: 'GET',
    url: 'https://insomniacookies.com/shop/checkPaymentMethods',
    json: true
};

var getHoursRequest = {
    method: 'GET',
    url: 'https://insomniacookies.com/shop/getHours/14/' + currentDate + '/delivery',
    json: true
};

var deliveryInstrRequest = { 
    method: 'POST',
    url: 'https://insomniacookies.com/shop/saveOrderInfo/deliveryInstructions',
    body: { variableInfo: "Call when you are here" },
    json: true 
};

var updateTipRequest = { 
    method: 'POST',
    url: 'https://insomniacookies.com/shop/updateTip',
    body: { amount: 0 },
    json: true 
};

var checkSubmittedDataRequest = { 
    method: 'POST',
    url: 'https://insomniacookies.com/shop/checkSubmitedData',
    body: { data: submittedData },
    json: true 
};

var getStoreStatusRequest = {
    method: 'GET',
    url: 'https://insomniacookies.com/shop/getStoreStatus',
    json: true
};

var canCheckoutRequest2 = {
    method: 'GET',
    url: 'https://insomniacookies.com/shop/canCheckout?order_type=2?payment=1',
    json: true
};

var addPaymentRequest = { 
    method: 'POST',
    url: 'https://insomniacookies.com/shop/addPayment',
    body: { method: 'cash' },
    json: true 
};

var completeOrderRequest = { 
    method: 'POST',
    url: 'https://insomniacookies.com/shop/completeOrder',
    body: { data: orderData },
    json: true 
};

var completeOrder = function () {
    request(completeOrderRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log("Yay, your cookies were ordered");
            console.log(response);
        }
    });
};

var getCart = function (cb) {
    request(getCartRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('getCart');
            cb();
        }
    });
};

var addPayment = function () {
    request(addPaymentRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('addPayment');
            completeOrder();
        }
    });
};

var canCheckout2 = function () {
    request(canCheckoutRequest2, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('canCheckout');
            addPayment();
        }
    });
};

var getStoreStatus = function () {
    request(getStoreStatusRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('getStoreStatus');
            canCheckout2();
        }
    });
};

var checkSubmittedData = function () {
    request(checkSubmittedDataRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('checkSubmittedData');
            getStoreStatus();
        }
    });
};

var updateTip = function () {
    request(updateTipRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('updateTip');
            checkSubmittedData();
        }
    });
};

var deliveryInstr = function () {
    request(deliveryInstrRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('deliveryInstr');
            updateTip();
        }
    });
};

var getHours = function () {
    request(getHoursRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('getHours');
            getCart(deliveryInstr);
        }
    });
};

var checkPaymentMethods = function () {
    request(checkPaymentMethodsRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('checkPaymentMethods');
            getHours();
        }
    });
};

var getSchoolcash = function () {
    request(getSchoolcashRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('getSchoolcash');
            checkPaymentMethods();
        }
    });
};

var getTip = function () {
    request(getTipRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('getTip');
            getSchoolcash();
        }
    });
};

var getPaymentVars = function () {
    request(getPaymentVarsRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('getPaymentVars');
            getCart(getTip);
        }
    });
};

var canCheckout = function () {
    request(canCheckoutRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('canCheckout');
            getPaymentVars();
        }
    });
};

var addProduct = function () {
    request(addProductRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('addProduct');
            getCart(canCheckout);
        }
    });
};

var setDateTime = function () {
    request(dateTimeRequest, function(error, response, body) {
        if (error) throw new Error(error);
        else {
            console.log('setDateTime');
            getCart(addProduct);
        }
    });
};

var initiateOrder = function () {
    request(storeRequest, function (error, response, body) {
        if (error) throw new Error(error);
        else { 
            var cookie = response.caseless.dict['set-cookie'][0];
            request = request.defaults({ headers: { 'Cookie': cookie } });
            console.log('initiateOrder');
            setDateTime();
        }
    });
};

// Flow
// initiateOrder -> setDateTime -> getCart -> addProduct ->
// getCart -> canCheckout -> getPaymentSessionVariables ->
// getCart -> getTip -> getSchoolcash -> checkPaymentMethods ->
// getHours -> getCart -> deliveryInstr -> updateTip ->
// checkSubmittedData -> getStoreStatus -> canCheckout ->
// addPayment -> completeOrder -> COOKIES
initiateOrder();