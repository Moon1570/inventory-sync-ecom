// Update Shopify Inventory
async function updateShopifyInventory(variantId, newStock) {
  const url = `https://${process.env.SHOPIFY_STORE}/admin/api/2024-01/inventory_levels/set.json`;
  try {
    await axios.post(
      url,
      {
        location_id: '12345678',
        inventory_item_id: variantId,
        available: newStock,
      },
      {
        auth: {
          username: process.env.SHOPIFY_API_KEY,
          password: process.env.SHOPIFY_PASSWORD,
        },
      }
    );
    console.log('Shopify stock updated!');
  } catch (error) {
    console.error('Shopify Update Error:', error.response.data);
  }
}

// Update Amazon Inventory
async function updateAmazonInventory(asin, newStock) {
  const url = `https://sellingpartnerapi-na.amazon.com/feeds/2024-01/documents`;
  try {
    await axios.post(
      url,
      {
        sku: asin,
        quantity: newStock,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AMAZON_ACCESS_KEY}`,
        },
      }
    );
    console.log('Amazon stock updated!');
  } catch (error) {
    console.error('Amazon Update Error:', error.response.data);
  }
}

// Update eBay Inventory
async function updateEbayInventory(sku, newStock) {
  const url = `https://api.ebay.com/sell/inventory/v1/inventory_item/${sku}`;
  try {
    await axios.put(
      url,
      {
        availability: { shipToLocationAvailability: { quantity: newStock } },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EBAY_CLIENT_ID}`,
        },
      }
    );
    console.log('eBay stock updated!');
  } catch (error) {
    console.error('eBay Update Error:', error.response.data);
  }
}

// Update Etsy Inventory
async function updateEtsyInventory(shopId, listingId, newStock) {
  const url = `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/inventory`;
  try {
    await axios.put(
      url,
      {
        products: [{ quantity: newStock }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ETSY_API_KEY}`,
        },
      }
    );
    console.log('Etsy stock updated!');
  } catch (error) {
    console.error('Etsy Update Error:', error.response.data);
  }
}

// Simulating an offline sale that reduces stock by 2 units
(async () => {
  console.log('Simulating offline sale...');
  let newStock = 5; // Assume 5 units left after offline sale

  await updateShopifyInventory('123456', newStock);
  await updateAmazonInventory('B08XYZ1234', newStock);
  await updateEbayInventory('SKU1234', newStock);
  await updateEtsyInventory('your_shop_id', 'your_listing_id', newStock);
})();
