import { useEffect, useState } from "react"





export default function Index() {
  const [checkedPage, setCheckedPage] = useState("product-page");
  useEffect(() => {
   console.log(checkedPage)
  }, [checkedPage])
  
return(
  <>
  <s-page>
    <s-heading>Welcome to Swatch Queen</s-heading>

    <s-section>
      <s-stack gap="base">
      <s-stack direction="inline" gap="base"><s-heading>Activate App</s-heading><s-badge tone="success" >Published</s-badge></s-stack>
      <s-text>Enable the app embed in your published theme to display interactive variant swatches on your storefront.</s-text>
      <s-button  variant="primary">Enable app embed</s-button>
      </s-stack>
  
    </s-section>

    <s-section>
      <s-heading>Setup guide</s-heading>
      <s-text>Use this personalized guide to set up swatches for your store.</s-text>
    
      <s-grid gridTemplateColumns="repeat(12, 1fr)" gap="base">


  <s-grid-item gridColumn="span 6" gridRow="span 1" padding="small" background="strong" borderRadius="base base base large-200">
    <s-stack gap="base base" padding="base base">
  
      <s-checkbox
      onInput={(e) => setCheckedPage("product-page")}
      checked={checkedPage === "product-page" ? true : false}
  label="Product page swatch"
  
></s-checkbox>
<s-image
  src="https://cdn.shopify.com/static/sample-product/House-Plant1.png"
  alt=""
  accessibilityRole="presentation"
  objectFit="cover"
></s-image>
    </s-stack>
  </s-grid-item>


  <s-grid-item gridColumn="span 6" gridRow="span 1" padding="small" background="strong" borderRadius="base base base large-200">
    <s-stack gap="base base" padding="base base">
  
      <s-checkbox
  label="Collection page swatch"
  checked={checkedPage === "collection-page" ? true : false}
  onInput={(e) => setCheckedPage("collection-page")}
  
></s-checkbox>
<s-image
  src="https://cdn.shopify.com/static/sample-product/House-Plant1.png"
  alt=""
  accessibilityRole="presentation"
  objectFit="cover"
></s-image>
    </s-stack>
  </s-grid-item>

 
</s-grid>
    </s-section>
  </s-page>
  
  </>
)
}


