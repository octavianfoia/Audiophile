/* 
The original mobile nav is initially hidden to the right side of the 
screen with a left margin of -40vw. So the idea behind this code is that 
when the hamburger button is pressed, it reads the current margin-left of the nav/ul. 
If it is 0, then -40vw is assigned to it; if it is -40vw, then 0 is assigned to it 
*/

const btn_hamb = document.getElementById('btn_hamb');
btn_hamb.addEventListener('click', function (event) {
  event.preventDefault();

  const ul = document.querySelector('header nav ul');

  if (ul.style.marginLeft == '0vw') {
    ul.style.marginLeft = '-50vw';
  } else {
    ul.style.marginLeft = '0vw';
  }
});

/*

Function fetches JSON data from the "db.json" file. After the data is successfully retrieved, it conditionally calls `renderCategory` and `renderItem` functions based on the provided `category` and `item_` arguments, respectively.

If any errors occur during the process, an error message is logged to the console.
After retrieving the items, it executes .then(data => {});, and the if conditions are used to filter by category or individual item. 


1. The function `getItems` takes two parameters: `category` and `item_`. These parameters are used to determine which parts of the fetched data should be rendered.

2. The `fetch` function is used to make an HTTP request to the specified URL, "/data_base/db.json", to retrieve the JSON data from the server.

3. The `fetch` function returns a Promise that resolves to the Response object. Methods are chained to this Promise using the `.then()` function.

4. The first `.then()` callback is executed when the Promise is resolved. It takes the `response` object as an argument and calls the `.json()` method on it. This converts the response data into a JavaScript object.

5. The second `.then()` callback is executed when the Promise from the previous `.then()` resolves. It takes the parsed JSON data as the `data` parameter. Inside this callback, there are conditional statements that check if `category` or `item_` are truthy values.

6. If `category` is truthy, the `renderCategory` function is called with the `data` object as an argument.

7. If `item_` is truthy, the `renderItem` function is called with the `data` object as an argument.

8. If there is an error during the fetch operation or any of the `.then()` callbacks, the `.catch()` method is called. The error is passed as an argument to the callback function, and it logs an error message to the console using `console.error()`.

*/

function getItems(category, item_) {
  fetch('/data_base/db.json')
    .then(response => response.json())
    .then(data => {
      if (category) {
        renderCategory(data);
      }
      if (item_) {
        renderItem(data);
      }
    })
    .catch(error => {
      console.error('Error JSON:', error);
    });
}

/*

Read the current URL of the browser and retrieve the parameters ?category or ?item; example: http://127.0.0.1:5501/?category=HEADPHONES &/or http://127.0.0.1:5501/?item=XX99%20Mark%20II" 

*/

const urlParams = new URLSearchParams(window.location.search);

const category = urlParams.get('category');
const item_ = urlParams.get('item');

if (category || item_) {
  /* If it detects a variable in the route, the `getItems()` function is activated*/
  getItems(category, item_);
}

/* 
`renderCategory` displays the categories page. Is executed when the items are retrieved and it filters them based on the category value. Then, it dynamically adds the filtered items using the DOM (using `createElement` and `appendChild` to create HTML elements). 
*/

function renderCategory(data) {
  var items = data.items.filter(function (item) {
    return item.category === category;
  });
  items.forEach((item, index) => {
    const categories_items = document.querySelector('#render_js_content');
    /* <div> with the ID "#render_js_content" where the categories and individual items will be dynamically added. */
    const article = document.createElement('article');
    const categories_img = document.createElement('div');
    const img = document.createElement('img');
    const categories_content = document.createElement('div');
    const span = document.createElement('span');
    const h2_1 = document.createElement('h2');
    const h2_2 = document.createElement('h2');
    const p = document.createElement('p');
    const a = document.createElement('a');
    const button = document.createElement('button');

    categories_items.appendChild(article);
    article.appendChild(categories_img);
    categories_img.appendChild(img);
    img.src = item.image;
    article.appendChild(categories_content);
    categories_content.appendChild(span);
    if (item.new == true) {
      span.textContent = 'NEW PRODUCT';
    }
    categories_content.appendChild(h2_1);
    h2_1.textContent = item.name;
    categories_content.appendChild(h2_2);
    h2_2.textContent = item.category;
    categories_content.appendChild(p);
    p.textContent = item.details;
    categories_content.appendChild(a);
    a.href = '?item=' + item.name;
    button.textContent = 'SEE PRODUCT';
    a.appendChild(button);
    article.className = 'categories_item';
    if (index % 2 != 0) {
      article.classList.add('rev_');
    }
    categories_img.className = 'category_img';
    categories_content.className = 'category_content';
    span.className = 'overline';
    button.className = 'subtitle btn';
  });

  document.querySelector('header').style.height = '45vh';
  const header_content = document.querySelector('#header_content');
  header_content.innerHTML = '';
  header_content.style.height = 'max-content';
  const title_category = document.createElement('div');
  title_category.className = 'title_category';
  header_content.appendChild(title_category);
  const h2_ = document.createElement('h2');
  h2_.textContent = category;
  title_category.appendChild(h2_);

  document.querySelector('#products').hidden = true;
}

/* `renderItems` is responsible for the page that appears when selecting a specific item */
function renderItem(data) {
  var items = data.items.filter(function (item) {
    return item.name === item_;
  });

  const render_js_content =
    document.querySelector(
      '#render_js_content'
    ); /*`<div>` with the ID "#render_js_content" where the categories and individual items will be dynamically added. */
  const article = document.createElement('article');
  const category_img = document.createElement('div');
  const img = document.createElement('img');
  const category_content = document.createElement('div');
  const span = document.createElement('span');
  const h2_1 = document.createElement('h2');
  const h2_2 = document.createElement('h2');
  const p = document.createElement('p');
  const h6 = document.createElement('h6');
  const div_add = document.createElement('div');
  const div_input = document.createElement('div');
  const btn_n = document.createElement('button');
  const input = document.createElement('input');
  const btn_p = document.createElement('button');
  const a = document.createElement('a');
  const button = document.createElement('button');

  render_js_content.appendChild(article);
  article.appendChild(category_img);
  category_img.appendChild(img);
  img.src = items[0].image;
  article.appendChild(category_content);
  category_content.appendChild(span);
  if (items[0].new == true) {
    span.textContent = 'NEW PRODUCT';
  }
  category_content.appendChild(h2_1);
  h2_1.textContent = items[0].name;
  category_content.appendChild(h2_2);
  h2_2.textContent = items[0].category;
  category_content.appendChild(p);
  p.textContent = items[0].details;
  category_content.appendChild(h6);
  h6.textContent = items[0].price
    .toLocaleString('es-US', { style: 'currency', currency: 'USD' })
    .replace('.00', '');
  category_content.appendChild(div_add);
  div_add.appendChild(div_input);
  div_input.appendChild(btn_n);
  btn_n.textContent = '-';
  div_input.appendChild(input);
  input.type = 'number';
  input.value = 1;
  input.readOnly = true;
  div_input.appendChild(btn_p);
  btn_p.textContent = '+';
  div_add.appendChild(button);
  button.textContent = 'ADD TO CART';
  button.onclick = function () {
    const qty = document.querySelector('.div_input input').value;
    add_item_to_shopping_cart(items[0], qty);
  };

  article.className = 'categories_item';
  category_img.className = 'category_img';
  category_content.className = 'category_content';
  span.className = 'overline';
  div_add.className = 'div_add';
  div_input.className = 'div_input';
  btn_n.className = 'btn_n';
  btn_n.onclick = rem;
  btn_p.className = 'btn_p';
  btn_p.onclick = add;
  button.className = 'subtitle btn';

  document.querySelector('header').style.height = '15vh';
  document.querySelector('header nav').style.borderBottom = '0';
  const header_content = document.querySelector('#header_content');
  header_content.innerHTML = '';
  header_content.style.height = '0';

  /* features/inthebox*/
  const details_container = document.createElement('div');
  const features = document.createElement('div');
  const h3_f_title = document.createElement('h3');
  const p_f1 = document.createElement('p');
  const p_f2 = document.createElement('p');
  const int_the_box = document.createElement('div');
  const h3_i_title = document.createElement('h3');
  /* li */

  render_js_content.appendChild(details_container);
  details_container.appendChild(features);
  features.appendChild(h3_f_title);
  features.appendChild(p_f1);
  features.appendChild(p_f2);
  details_container.appendChild(int_the_box);
  int_the_box.appendChild(h3_i_title);

  items[0].in_the_box.forEach(li_content => {
    const li_i = document.createElement('li');
    const span_i = document.createElement('span');
    const p_i = document.createElement('p');

    int_the_box.appendChild(li_i);
    li_i.appendChild(span_i);
    span_i.textContent = li_content.qty + 'x';
    li_i.appendChild(p_i);
    p_i.textContent = li_content.item;
  });

  h3_f_title.textContent = 'FEATURES';
  p_f1.textContent = items[0].features_p1;
  p_f2.textContent = items[0].features_p2;
  h3_i_title.textContent = 'IN THE BOX';

  details_container.className = 'details_container';
  features.className = 'features';
  int_the_box.className = 'in_the_box';

  /* gallery item */
  const gallery_container = document.createElement('div');
  const gallery_col_1 = document.createElement('div');
  const img_1 = document.createElement('img');
  const img_2 = document.createElement('img');
  const gallery_col_2 = document.createElement('div');
  const img_3 = document.createElement('img');

  render_js_content.appendChild(gallery_container);
  gallery_container.className = 'gallery_container';
  gallery_container.appendChild(gallery_col_1);
  gallery_col_1.className = 'gallery_col_1';
  gallery_col_1.appendChild(img_1);
  img_1.src = items[0].img_1;
  gallery_col_1.appendChild(img_2);
  img_2.src = items[0].img_2;
  gallery_container.appendChild(gallery_col_2);
  gallery_col_2.className = 'gallery_col_2';
  gallery_col_2.appendChild(img_3);
  img_3.src = items[0].img_3;

  /* recommend  items*/
  const recommend_container = document.createElement('div');
  const recommend_title = document.createElement('h3');
  const recommend_items = document.createElement('div');

  render_js_content.appendChild(recommend_container);
  recommend_container.className = 'recommend_container';
  recommend_container.appendChild(recommend_title);
  recommend_title.textContent = 'YOU MAY ALSO LIKE';
  recommend_container.appendChild(recommend_items);
  recommend_items.className = 'recommend_items';

  var random_recommend = data.items
    .filter(element => element.id !== items[0].id)
    .slice(0, 3);
  random_recommend.forEach(element => {
    const recommend_item = document.createElement('div');
    const img_container = document.createElement('div');
    const recommend_item_img = document.createElement('img');
    const recommend_item_name = document.createElement('h5');
    const a_ = document.createElement('a');
    const recommend_item_button = document.createElement('button');

    recommend_item.className = 'recommend_item';
    recommend_items.appendChild(recommend_item);
    recommend_item.appendChild(img_container);
    img_container.className = 'img_container';
    img_container.appendChild(recommend_item_img);
    recommend_item_img.src = element.image;
    recommend_item.appendChild(recommend_item_name);
    recommend_item_name.textContent = element.name;
    recommend_item.appendChild(a_);
    a_.href = '?item=' + element.name;
    a_.appendChild(recommend_item_button);
    recommend_item_button.textContent = 'SEE PRODUCT';
    recommend_item_button.className = 'subtitle btn';
  });

  document.querySelector('#products').hidden = true;

  function rem() {
    /* Remove item from cart - by 1 */
    if (input.value > 0) {
      input.value--;
    }
  }
  function add() {
    /* This adds 1. */
    if (input.value < 10) {
      input.value++;
    }
  }
}

/* 
shopping cart - dynamically create the container and items
*/
function render_cart() {
  const body = document.querySelector('body');

  const shopping_cart_container = document.createElement('div');
  const shopping_cart_container_max_with = document.createElement('div');
  const shopping_content = document.createElement('div');
  const shop_header = document.createElement('div');
  const shop_h6 = document.createElement('h6');
  const shop_span = document.createElement('span');
  const shop_footer = document.createElement('div');
  const total_p = document.createElement('span');
  const price_h6 = document.createElement('h6');
  const shop_a = document.createElement('a');
  const shop_button = document.createElement('button');

  shopping_cart_container.className = 'shopping_cart_container';
  shopping_cart_container_max_with.className =
    'shopping_cart_container_max_with';
  shopping_content.className = 'shopping_content';
  shop_header.className = 'shop_header';
  shop_footer.className = 'shop_footer';

  body.appendChild(shopping_cart_container);
  shopping_cart_container.appendChild(shopping_cart_container_max_with);
  shopping_cart_container_max_with.appendChild(shopping_content);
  shopping_content.appendChild(shop_header);
  shop_header.appendChild(shop_h6);
  shop_h6.textContent = 'CART ()';
  shop_header.appendChild(shop_span);
  shop_span.textContent = 'Remove all';
  shop_span.onclick = delete_all_items_from_shopping_cart;

  /* Calling the function that retrieves the items added to the shopping cart from the database. */
  get_shopping_cart_items()
    .then(responseData => {
      responseData.forEach(element => {
        /* Render the necessary elements for each item. */
        const shop_article = document.createElement('article');
        shop_article.className = 'shop_article';
        const item_img = document.createElement('img');
        const div_name_price = document.createElement('div');
        div_name_price.className = 'div_name_price';
        const item_name = document.createElement('span');
        const item_price = document.createElement('p');
        const div_input = document.createElement('div');
        div_input.className = 'div_input';
        const btn_n = document.createElement('button');
        btn_n.className = 'btn_n';
        const item_input = document.createElement('input');
        const btn_p = document.createElement('button');
        btn_p.className = 'btn_p';

        shopping_content.appendChild(shop_article);
        shop_article.appendChild(item_img);
        item_img.src = element.image;
        shop_article.appendChild(div_name_price);
        div_name_price.appendChild(item_name);
        item_name.textContent = element.name;
        div_name_price.appendChild(item_price);
        item_price.textContent = element.price
          .toLocaleString('es-US', { style: 'currency', currency: 'USD' })
          .replace('.00', '');
        shop_article.appendChild(div_input);
        div_input.appendChild(btn_n);
        btn_n.textContent = '-';
        btn_n.onclick = function () {
          const item_input = document.querySelector('#input_' + element.id);
          if (item_input.value > 0) {
            item_input.value--;
            cart_total_price(
              element
            ); /* Recalculate the price when changing the quantity of each item. */
            update_item_in_shopping_cart(
              element,
              item_input.value
            ); /* Update the new quantity in the database. */
          }
          if (item_input.value == 0) {
            delete_item_from_shopping_cart(
              element.id
            ); /* Delete the item from the shopping cart if quantity is 0. */
          }
        };
        div_input.appendChild(item_input);
        item_input.type = 'number';
        item_input.id = 'input_' + element.id;
        item_input.value = element.qty;
        item_input.readOnly = true;
        div_input.appendChild(btn_p);
        btn_p.textContent = '+';
        btn_p.onclick = function () {
          const item_input = document.querySelector('#input_' + element.id);
          if (item_input.value < 10) {
            item_input.value++;
            cart_total_price(element);
            update_item_in_shopping_cart(element, item_input.value);
          }
        };
      });
      shopping_content.appendChild(shop_footer);
      shop_footer.appendChild(total_p);
      total_p.textContent = 'TOTAL';
      shop_footer.appendChild(price_h6);
      cart_total_price();
      shopping_content.appendChild(shop_a);
      shop_a.href = '?checkout=show';
      shop_a.appendChild(shop_button);
      shop_button.textContent = 'CHECKOUT';
      shop_button.className = 'shop_button';
    })
    .catch(error => {
      console.error(error);
    });

  /* close shopping cart */
  shopping_cart_container.addEventListener('click', function (event) {
    if (
      event.target === shopping_cart_container ||
      event.target.className === 'shopping_cart_container_max_with'
    ) {
      shopping_cart_container.remove();
    }
  });
}

/* Calculate the new total price of the shopping cart. */
function cart_total_price(data) {
  const shoppingContainer = document.querySelector('.shopping_content');
  const priceElements = shoppingContainer.querySelectorAll('.div_name_price p');
  const qty_input = shoppingContainer.querySelectorAll('.div_input input');
  let total = 0;

  priceElements.forEach((element, index) => {
    const price =
      parseInt(element.textContent.replace(/[^\d.]/g, '')) *
      qty_input[index].value;

    total += price;
  });
  document.querySelector('.shop_footer h6').textContent = total
    .toLocaleString('es-US', { style: 'currency', currency: 'USD' })
    .replace('.00', '');
  document.querySelector('.shop_header h6').textContent =
    'CART (' + priceElements.length + ')';
}

/* 
CRUD - The fetch method defaults to GET (for retrieving data, USED when loading items from db.json). 
    - the POST method (for adding new items to the shopping cart database), 
    - the PUT method (for editing existing items in the shopping cart database), 
    - the DELETE method (for removing items from the shopping cart). 
*/

async function get_shopping_cart_items() {
  return fetch('http://localhost:3000/shopping_cart')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

function add_item_to_shopping_cart(data_, qty) {
  const data = {
    id: data_.id,
    name: data_.name,
    price: data_.price,
    image: data_.image,
    qty: qty,
  };

  fetch('http://localhost:3000/shopping_cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData);
    })
    .catch(error => {
      console.error(error);
    });
}

/* delete */

function delete_item_from_shopping_cart(itemId) {
  fetch(`http://localhost:3000/shopping_cart/${itemId}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData);
    })
    .catch(error => {
      console.error(error);
    });
}

function delete_all_items_from_shopping_cart(var_) {
  /* First it has to call the function that retrieves the items added to the shopping cart from the database. */
  get_shopping_cart_items()
    .then(responseData => {
      /* json-server doesnt allow deleting all the items from the cart at once. so the function will search for the items in the cart and delete them one by one - foreach */
      responseData.forEach(element => {
        fetch('http://localhost:3000/shopping_cart/' + element.id, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(responseData => {
            console.log(responseData);
          })
          .catch(error => {
            console.error(error);
          });

        if (var_ == 'THANK') {
          window.location.href = '/';
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
}

/* update qty items */
function update_item_in_shopping_cart(Data_, input_value) {
  const newdata = {
    id: Data_.id,
    name: Data_.name,
    price: Data_.price,
    image: Data_.image,
    qty: input_value,
  };

  fetch(`http://localhost:3000/shopping_cart/${newdata.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newdata),
  })
    .then(response => response.json())
    .then(responseData => {})
    .catch(error => {
      console.error(error);
    });
}

/* Get the items that are in the shopping cart to display them in the checkout summary. */

const checkout = urlParams.get('checkout');

if (checkout) {
  document.querySelector('header').style.height = '15vh';
  document.querySelector('header nav').style.borderBottom = '0';
  const header_content = document.querySelector('#header_content');
  header_content.innerHTML = '';
  header_content.style.height = '0';

  document.querySelector('main').style.display = 'none';
  document.querySelector('#checkout').style.display = 'flex';
  const summary_content = document.querySelector('#summary');

  get_shopping_cart_items()
    .then(responseData => {
      responseData.forEach(element => {
        const shop_article = document.createElement('article');
        shop_article.className = 'shop_article';
        const item_img = document.createElement('img');
        const div_name_price = document.createElement('div');
        div_name_price.className = 'div_name_price';
        const item_name = document.createElement('span');
        const item_price = document.createElement('p');
        const qty_ = document.createElement('span');
        qty_.className = 'qty_';

        summary_content.appendChild(shop_article);
        shop_article.appendChild(item_img);
        item_img.src = element.image;
        shop_article.appendChild(div_name_price);
        div_name_price.appendChild(item_name);
        item_name.textContent = element.name;
        div_name_price.appendChild(item_price);
        item_price.textContent = element.price
          .toLocaleString('es-US', { style: 'currency', currency: 'USD' })
          .replace('.00', '');
        shop_article.appendChild(qty_);
        qty_.textContent = 'x' + element.qty;
      });

      const shop_footer = document.createElement('div');
      shop_footer.className = 'shop_footer';
      const total_div = document.createElement('div');
      const total_p = document.createElement('span');
      const total_h6 = document.createElement('h6');
      const shipping_div = document.createElement('div');
      const shipping_p = document.createElement('span');
      const shipping_h6 = document.createElement('h6');
      const vat_div = document.createElement('div');
      const vat_p = document.createElement('span');
      const vat_h6 = document.createElement('h6');
      const grand_total_div = document.createElement('div');
      const grand_total_p = document.createElement('span');
      const grand_total_h6 = document.createElement('h6');

      const shop_a = document.createElement('a');
      const shop_button = document.createElement('button');

      summary_content.appendChild(shop_footer);
      shop_footer.appendChild(total_div);
      total_div.appendChild(total_p);
      total_div.appendChild(total_h6);
      total_p.textContent = 'TOTAL';
      shop_footer.appendChild(shipping_div);
      shipping_div.appendChild(shipping_p);
      shipping_div.appendChild(shipping_h6);
      shipping_p.textContent = 'SHIPPING';
      var n_shipping = 50;
      shipping_h6.textContent = '$ ' + n_shipping;
      shop_footer.appendChild(vat_div);
      vat_div.appendChild(vat_p);
      vat_div.appendChild(vat_h6);
      vat_p.textContent = 'VAT (INCLUDED)';
      var n_vat = 1079;
      vat_h6.textContent = n_vat
        .toLocaleString('es-US', { style: 'currency', currency: 'USD' })
        .replace('.00', '');
      shop_footer.appendChild(grand_total_div);
      grand_total_div.className = 'grand_total_div';
      grand_total_div.appendChild(grand_total_p);
      grand_total_div.appendChild(grand_total_h6);
      grand_total_p.textContent = 'GRAND TOTAL';

      summary_content.appendChild(shop_a);
      shop_a.href = '?checkout=pay';
      shop_a.appendChild(shop_button);
      shop_button.textContent = 'CONTINUE';
      shop_button.className = 'shop_button';

      const priceElements =
        summary_content.querySelectorAll('.div_name_price p');
      const qty_input = summary_content.querySelectorAll('.qty_');
      let total = 0;

      priceElements.forEach((element, index) => {
        const price =
          parseInt(element.textContent.replace(/[^\d.]/g, '')) *
          parseInt(qty_input[index].innerText.slice(1));

        total += price;
      });
      document.querySelector('.shop_footer h6').textContent = total
        .toLocaleString('es-US', { style: 'currency', currency: 'USD' })
        .replace('.00', '');
      document.querySelector('.shop_footer .grand_total_div h6').textContent = (
        total + n_shipping
      )
        .toLocaleString('es-US', { style: 'currency', currency: 'USD' })
        .replace('.00', '');
    })
    .catch(error => {
      console.error(error);
    });

  if (checkout == 'pay') {
    document.querySelector('#pop_up_ty_for_your_order').style.display = 'flex';
  }
}
