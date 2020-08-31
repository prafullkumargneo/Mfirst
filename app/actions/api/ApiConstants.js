/* App config for apis
 */
const ApiConstants = {
    BASE_URL: 'https://mkodoo-mamasfirst.odoo.com/',
    GETCATEGORY: 'api/shop/category',
    SUBCATEGORY: 'api/shop/category/info?category_id=',
    BANNERCATEGORY:'api/get_banner',
    SIGNIN:'api/login?',
    SIGNUP:'api/signup',
    PRODUCT_DETAILS:'api/shop/product/info?product_id=',
    ADDTOCART:'api/cart/update',
    GETCART:'api/shop/cart?',
    SHIPPINGADDRESS:'api/checkout/shipping',
    SELECTEDSHIPPINGADDRESS:'api/checkout/save/shipping',
    TRENDINGPRODUCT:'mfl/trending/categories',
    TRENDINGCATEGORY: 'mfl/trending/products?categoryId=',
    DISCOVERCATEFORY:'mfl/discover',
    GETPAYMENTOPTIONS:'api/shop/get/payment',
    REVIEWORDER:'api/checkout/review_order',
    ORDERPLACED:'api/shop/payment/process',
    ORDERLIST:'api/my/orders',
    ORDERDETAILS:'api/my/order/details',
    GETSEARCHLIST:'get_search_category_list',
    GETFILTEROPTION:'api/get_color_price_range'
  };
  
  export default ApiConstants;
  