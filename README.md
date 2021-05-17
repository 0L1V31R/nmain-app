# N&Main ECommerce Website

1. WebSite Template
   1. create nmain folder
   2. create backend and frontend folder
   3. create template folder
   4. create index.html
   5. add default html code
   6. link to style.css
   7. style elements
2. Display Products
   1. create products div
   2. add product attributes
   3. add link, image, name and price
3. Create React App
   1. npx create-react-app frontend
   2. npm start
   3. remove unused files
   4. copy index.html content to app.j
   5. copy style.css content to index.css
   6. replace class with className
4. Create Rating and Product Component
   1. create component/Rating.js
   2. create div.rating
   3. style div.rating, span and last span
   4. create component/Product.js
   5. use Rating component
5. Create Product Screen
   1. install react-router-dom
   2. use BrowserRouter and Route for HomeScreen
   3. create HomeSCreen.js
   4. add product list code there
   5. create ProductScreen.js
   6. add new from product details to App.js
   7. create 3 columns for product image, info and action
6. Create Node.Js Server
   1. run npm init in backend folder
   2. update package.json set type: module
   3. add .js to imports
   4. npm install express
   5. create server.js
   6. add start command as node server.js
   7. require express
   8. create route for / return backend is ready
   9. move products.js from forntend to backend
   10. create route for /api/products
   11. return products
   12. run npm start
7. Load Products from backend
   1. edit HomeScreen.js
   2. define produts, loading and error
   3. create async useEffect
   4. define async fetchData and call it
   5. install axios
   6. get data from /api/products
   7. show them in the list
   8. create loading component
   9. create message box component
   10. use them in HomeScreen
8. Install ESlint for code linting
   1. install vscode extension
   2. npm install -D eslint
   3. run ./node_modules/.bin/eslint --init
   4. create ./frontend/.env
   5. add SKIP_PREFLIGHT_CHECK=true
9. Add Redux to HomeScreen
   1. npm install redux react-redux
   2. create store.js
   3. initState= {products:[]}
   4. reducer = (state, action) => switch LOAD_PRODUCTS: {products: action.payload}
   5. export default createStore(reducer, initState)
   6. edit HomeScreen.js
   7. shopName = useSelector(state => state.products)
   8. const dispatch = useDispath()
   9. useEffect(()=>dispatch({type: LOAD_PRODUCTS, payload: data}))
   10. add store to index.js
10. Add Redux to ProductScreen
    1. create product details constant, action and reducers
    2. add reducer to store.js
    3. use reducer in ProductScreen.js
    4. add /api/product/:id to backend api
11. Handle Add To Cart Button
    1. handle AddToCart in ProductScreen.js
    2. create CartScreen.js
12. Implement add to cart action
    1. create addToCart constants, action and reducers
    2. add reducer to store.js
    3. use action in CartScreen.js
    4. render cartItems.length
13. Build CartScreen
    1. create 2 columns for cart items and cart action
    2. cartItems.length === 0 ? cart is empty
    3. show item image, name, qty and price
    4. Proceed to checkout button
    5. implement remove cart action
14. Implement remove from cart action
    1. create removefromCart constant, action and reducers
    2. add reducer to store.js
    3. use action in CartScreen.js
