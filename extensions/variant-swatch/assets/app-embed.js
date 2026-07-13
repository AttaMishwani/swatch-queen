



const hideElement = (el)=>{
  el.style.cssText =     `position: absolute;     width: 1px;     height: 1px;     overflow: hidden;     opacity: 0;     pointer-events: none;     clip: rect(0,0,0,0);`  ;
  el.setAttribute('aria-hidden', 'true');
}





const findVariantWrapper = () => {
  const WRAPPER_SELECTORS = [
    'variant-radios',            // Dawn radio style
    'variant-picker',            // Horizon theme
    '.variant-picker',           // Class-based variant picker
    'variant-selects',           // Dawn OS 2.0
    '.product-form__variants',   // Debut theme
    '.product__variants',        // Impulse theme
    '[data-variant-picker]',     // Custom themes
    ];

    for (const selector of WRAPPER_SELECTORS) {
      const wrapper = document.querySelector(selector);

      if(wrapper) {
        console.log(`SwatchQueen PDP: Wrapper found → ${selector}`);
        return wrapper;
      }

    }

    
    console.log(`SwatchQueen PDP: Wrapper not found → ${selector}`);
    return null;
}

const findProductForm = () => {
  const FORM_SELECTORS = [
    'form[action="/cart/add"]',   // Dawn and most themes
    '.product-form',              // Common class
    '[data-product-form]',        // Data attribute pattern
    'form.variant-picker__form',  // Horizon theme
    '.product__form',             // Some themes
    ];

    for (const selector of FORM_SELECTORS) {
      const form = document.querySelector(selector);
      if(form) {
        console.log(`SwatchQueen PDP: Form found → ${selector}`);
        return form;
      }
    }

    console.log('SwatchQueen PDP: No form found');
    return null;
}



  const findInjecttionPoint = () => {

const wrapper = findVariantWrapper();
const productForm = findProductForm();

if (wrapper && productForm) {
  console.log('SwatchQueen PDP: Case 1 → Wrapper + Form both found');
  return { wrapper, form: productForm, case: 'both' };
  }
  
  if (wrapper && !productForm) {
  console.log('SwatchQueen PDP: Case 2 → Wrapper only');
  return { wrapper, form: null, case: 'wrapper-only' };
  }
  
  if (!wrapper && productForm) {
  console.log('SwatchQueen PDP: Case 3 → Form only');
  return { wrapper: null, form: productForm, case: 'form-only' };
  }
  
  console.warn('SwatchQueen PDP: No injection point found — cannot render swatches');
  return null;

  }


  const getSwatchStyle = async()=>{

    try {
      const shopDomain = window.Shopify?.shop;
console.log(shopDomain , "found on frontend")
      if(!shopDomain){
       return console.log("SwatchQueen PDP: window.Shopify.shop not found")
      }
      const res = await fetch(`/apps/public?shop=${shopDomain}`);

  const json = await res.json();
  console.log(json)

    } catch (error) {
      console.log(error)
    }
  }



const initSwatches = async() => {
    console.log('initSwatches function running');

    const result = findInjecttionPoint();
    const pdpSwatchStyle = await getSwatchStyle();

    if (!result) {
      document.documentElement.classList.remove('sq-hide-native');
      return;
    }

    const swatchesContainer = document.createElement('div');
    swatchesContainer.className = "sq-swatches-container";
    const h1 = document.createElement("h1");
    h1.innerHTML = "cusotm swatch"
    swatchesContainer.appendChild(h1);


// ------------------------------------------------------------------
// CASE 1: Both wrapper and form found (Horizon theme)
// Hide the entire wrapper, inject the container after it, then
// check the form for fieldsets first (Horizon's radio pattern),
// falling back to selects if no fieldsets are present.
// ------------------------------------------------------------------
    if(result.case === "both"){
      hideElement(result.wrapper)
      result.wrapper.insertAdjacentElement("afterend" , swatchesContainer)


      // ------------------------------------------------------------------
// CASE 2: Wrapper only (Dawn OS 2.0)
// Selects live directly inside the wrapper element.
// ------------------------------------------------------------------
    } else if(result.case === "wrapper-only" ){
      hideElement(result.wrapper);
result.wrapper.insertAdjacentElement('afterend', swatchesContainer);



// ------------------------------------------------------------------
// CASE 3: Form only (older / legacy themes)
// No wrapper to hide — hide each select individually, then inject
// the container after the first select's position in the DOM.
// ------------------------------------------------------------------
    }else if (result.case === 'form-only') {
      const allSelects = Array.from(
      result.form.querySelectorAll('select[name^="options["]')
      );
      
      if (allSelects.length === 0) {
        console.warn('SwatchQueen PDP: No selects found inside form — cannot render');
        return;
      }
      
      allSelects.forEach(select => hideElement(select));
      allSelects[0].insertAdjacentElement('afterend', swatchesContainer);
 
      
      
      }


      // If every option row was skipped (all disabled, all hidden OOS, etc.)
// remove the empty container so it leaves no trace in the DOM
      if (swatchesContainer.children.length === 0) {
        swatchesContainer.remove();
        console.warn('SwatchQueen PDP: No swatch rows were rendered — container removed');
        return;
        }






}




document.addEventListener('DOMContentLoaded', () => {
  console.log('TAE js running');
  initSwatches();
});