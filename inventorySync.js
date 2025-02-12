// chatGPT response

require('dotenv').config();
const axios = require('axios');

// Fetch Shopify Inventory
async function getShopifyInventory(productId) {
  const url = `https://${process.env.SHOPIFY_STORE}/admin/api/2024-01/products/${productId}.json`;
  try {
    const response = await axios.get(url, {
      auth: {
        username: process.env.SHOPIFY_API_KEY,
        password: process.env.SHOPIFY_PASSWORD,
      },
    });
    return response.data.product.variants.map((variant) => ({
      id: variant.id,
      title: variant.title,
      stock: variant.inventory_quantity,
    }));
  } catch (error) {
    console.error('Shopify API Error:', error.response.data);
  }
}

// Fetch Amazon Inventory (SP-API)
async function getAmazonInventory(asin) {
  const url = `https://sellingpartnerapi-na.amazon.com/fba/inventory/v1/summaries?sku=${asin}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.AMAZON_ACCESS_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Amazon API Error:', error.response.data);
  }
}

// Fetch eBay Inventory
async function getEbayInventory(sku) {
  const url = `https://api.ebay.com/sell/inventory/v1/inventory_item/${sku}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.EBAY_CLIENT_ID}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('eBay API Error:', error.response.data);
  }
}

// Fetch Etsy Inventory
async function getEtsyInventory(shopId, listingId) {
  const url = `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/inventory`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.ETSY_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Etsy API Error:', error.response.data);
  }
}

// Simulating Inventory Fetch
(async () => {
  console.log('Fetching inventory...');
  const shopifyData = await getShopifyInventory('123456');
  const amazonData = await getAmazonInventory('B08XYZ1234');
  const ebayData = await getEbayInventory('SKU1234');
  const etsyData = await getEtsyInventory('your_shop_id', 'your_listing_id');

  console.log({
    Shopify: shopifyData,
    Amazon: amazonData,
    eBay: ebayData,
    Etsy: etsyData,
  });
})();
