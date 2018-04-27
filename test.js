var request = require("request");

var options = { 
  method: 'POST',
  url: 'https://insomniacookies.com/shop/selectStore',
  headers: 
   {
     'cache-control': 'no-cache',
     'content-type': 'application/json' 
   },
  body: 
   { 
     deliveryType: 3,
     storeID: 14,
     orderTypeID: 3,
     deliveryTierLevel: 0
   },
   json: true 
};

var j = request.jar()
var request = request.defaults({jar:j})
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  var cookie = response.caseless.dict['set-cookie'][0];
  request({
          method: 'POST',
          url: 'https://insomniacookies.com/shop/addPayment',
          body: { 
            method: 'credit',
            data: 
            { type: 'api',
              card_number: 'CRI',
              exp_month: '08',
              exp_year: '20',
              payment_firstname: 'Abhinav',
              payment_lastname: ' Suri',
              payment_zip: '78231',
              cvv: '344',
              phone: '2108619271',
              email: 'suria@seas.upenn.edu',
              shipping_name: 'abhi suri',
              shipping_address_1: '101  South 39th Street',
              shipping_city: 'Philadelphia',
              shipping_state: 'PA',
              shipping_zip: '19104',
            } 
          },
          json: true
  }, function(err, res, body) {
    console.log(j.getCookieString('https://insomniacookies.com'))
    console.log(body); 
  })
});
