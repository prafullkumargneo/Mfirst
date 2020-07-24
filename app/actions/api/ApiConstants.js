/* App config for apis
 */
const ApiConstants = {
    BASE_URL: 'http://45.79.122.85:8033/',
    GETCATEGORY: 'api/shop/category',
    SUBCATEGORY: 'api/shop/category/info?category_id=',
    BANNERCATEGORY:'api/get_banner',
    SIGNIN:'api/login?',
    SIGNUP:'api/signup?',
    PRODUCT_DETAILS:'api/shop/product/info?product_id=',
    ADDTOCART:'api/cart/update',
    GETCART:'api/shop/cart?',
    SHIPPINGADDRESS:'api/checkout/shipping',
    TRENDINGPRODUCT:'mfl/trending/categories',
    TRENDINGCATEGORY: 'mfl/trending/products?categoryId=',
    DISCOVERCATEFORY:'mfl/discover'
  };
  
  export default ApiConstants;
  