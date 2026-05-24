# AutomationCamp Toolshop \- Final Project

by: Moe Monfared

## Cypress \+ JavaScript Automation Framework

**Template Framework:** [https://github.com/mmonfared/cypress-framework](https://github.com/mmonfared/cypress-framework)  
**Application Under Test:** [automationcamp-toolshop](https://github.com/mmonfared/automationcamp-toolshop)
**Frontend:** [http://localhost:5173](http://localhost:5173)  
**API:** [http://localhost:3001/api](http://localhost:3001/api)  
**API Status:** [http://localhost:3001/api/status](http://localhost:3001/api/status)  
**Version:** AutomationCamp Toolshop v1.1.0

---

## App Setup

```bash
# 1. Install all dependencies
npm run setup

# 2. Start the application
npm start
```

To reset the database to its original seed state before running tests:

```bash
npm run reset-db
```

Or reset and start in one command:

```bash
npm run reset-and-start
```
Once you start the application, you may open your test framework in a separate IDE instance and start writing your tests.

---

## Test Accounts

| Email | Password | Role |
| :---- | :---- | :---- |
| [customer@automationcamp.org](mailto:customer@automationcamp.org) | welcome01 | User (Jane Doe) |
| [customer2@automationcamp.org](mailto:customer2@automationcamp.org) | welcome01 | User (John Smith) |
| [customer3@automationcamp.org](mailto:customer3@automationcamp.org) | pass123 | User (Bob Wilson) |
| [admin@automationcamp.org](mailto:admin@automationcamp.org) | welcome01 | Admin |

---

## Exam Instructions:

### Framework Requirements

- Use **Cypress** with **JavaScript**  
- Implement **Page Object Model (POM)** design pattern  
- Use proper assertions and waits  
- Implement reusable functions/commands  
- Add proper test data management  
- Include before/after hooks

### Evaluation Criteria

1. **Test Execution (25%)** \- All tests execute successfully and pass  
2. **Code Quality (25%)** \- Clean, maintainable code following best practices  
3. **Framework Design (20%)** \- Proper POM implementation, reusability, custom commands  
4. **API Testing (15%)** \- Correct API calls, proper authentication, response validation  
5. **Assertions (10%)** \- Comprehensive and meaningful assertions  
6. **Documentation (5%)** \- README file with setup and execution instructions

---

**Good luck with your automation testing\! \- Moe**

## **Final Exam Test Cases**

| \# | Category | Test Case Title | Description | Test Steps | Expected Result | Difficulty |
| :---: | :---- | :---- | :---- | :---- | :---- | :---- |
| **1** | Authentication | Valid user login | Verify user can login with valid credentials | 1\. Navigate to /auth/login 2\. Enter valid email (customer@automationcamp.org) 3\. Enter valid password (welcome01) 4\. Click Login button | User is logged in and redirected to home page; user menu becomes visible in the header | Easy |
| **2** | Authentication | Invalid login \- wrong password | Verify error message for invalid credentials | 1\. Navigate to login page 2\. Enter valid email (customer@automationcamp.org) 3\. Enter wrong password 4\. Click Login button | Error message displayed: "Invalid credentials" | Easy |
| **3** | Authentication | Successful user registration | Verify new user can register with valid data | 1\. Navigate to /auth/register 2\. Fill all required fields (first name, last name, email, password, confirm password, phone, DOB) 3\. Submit form | Registration successful, user auto-logged in and redirected to /account/profile | Medium |
| **4** | Product | Display products on home page | Verify products are displayed on landing page | 1\. Navigate to home page 2\. Verify product grid is visible | At least 9 products are displayed, each with a name and price | Easy |
| **5** | Product | Product search with valid keyword | Verify search returns matching products | 1\. Navigate to home page 2\. Enter "hammer" in search box 3\. Click search button | Products containing "hammer" are displayed (e.g. Claw Hammer 16oz, Ball Peen Hammer 12oz, Rubber Mallet) | Medium |
| **6** | Product | Filter products by category | Verify category filter works | 1\. Navigate to home page 2\. Select "Power Tools" from the category filter 3\. Verify filtered results | Only power tool products are displayed | Medium |
| **7** | Product | Sort products by price (Low to High) | Verify sorting functionality | 1\. Navigate to home page 2\. Select "Price (Low \- High)" from sort dropdown 3\. Verify product order | Products are sorted with lowest price first; all visible product prices are in ascending order | Medium |
| **8** | Shopping Cart | Add product to cart as guest | Verify guest user can add product to cart | 1\. Navigate to home page 2\. Click on a product (e.g. Claw Hammer 16oz) 3\. Click "Add to Cart" 4\. Verify cart badge | Cart badge updates to show quantity "1" | Easy |
| **9** | Shopping Cart | Update quantity in cart | Verify quantity can be updated in cart | 1\. Add a product to cart 2\. Navigate to /checkout 3\. Increase quantity to 3 4\. Verify updated total | Quantity updated to 3, total price recalculated correctly | Medium |
| **10** | Shopping Cart | Remove product from cart | Verify product can be removed from cart | 1\. Add a product to cart 2\. Navigate to /checkout 3\. Click remove (×) button 4\. Verify cart | Product is removed from cart, cart becomes empty or badge decrements | Easy |
| **11** | Favorites | Add product to favorites (logged in) | Verify logged-in user can add to favorites | 1\. Login as customer@automationcamp.org 2\. Navigate to a product detail page 3\. Click the heart/favorites icon 4\. Navigate to /account/favorites | Product appears in the favorites list | Medium |
| **12** | Contact Form | Submit contact form as guest | Verify guest can submit contact form | 1\. Navigate to /contact 2\. Fill name, email, subject, and message 3\. Click Submit | Form submitted successfully, confirmation message displayed | Medium |
| **13** | User Account | View user profile | Verify user can view their profile | 1\. Login as customer@automationcamp.org 2\. Navigate to /account/profile 3\. Verify profile fields are visible | User details are displayed (name, email, phone, address, DOB), Change password section is visible | Easy |
| **14** | Admin Panel | Add new brand | Verify admin can add a brand | 1\. Login as admin@automationcamp.org 2\. Navigate to /admin/brands 3\. Click Add Brand 4\. Fill brand name 5\. Save | New brand is created and appears in the brands list | Medium |
| **15** | Admin Panel | Add new product | Verify admin can add a product | 1\. Login as admin 2\. Navigate to /admin/products 3\. Click Add Product 4\. Fill all required fields (name, description, price, stock, category, brand) 5\. Save | New product is created and visible in the product list | Hard |
| **16** | Admin Panel | Update order status | Verify admin can change an order status | 1\. Login as admin 2\. Navigate to /admin/orders 3\. Click on an order 4\. Change status to "SHIPPED" 5\. Save | Order status updated to SHIPPED and reflected in the order detail | Medium |
| **17** | Admin Panel | Disable user account | Verify admin can disable a user | 1\. Login as admin 2\. Navigate to /admin/users 3\. Edit customer3@automationcamp.org 4\. Set account to disabled 5\. Save 6\. Attempt to login as that user | User account is disabled; login attempt shows an appropriate error or is rejected | Hard |
| **18** | API Testing | GET all products | Verify the products list endpoint | 1\. Send GET request to /api/products 2\. Verify response status 3\. Verify response structure | Status 200, paginated JSON object with a data array of products, each with id, name, price fields | Medium |
| **19** | API Testing | POST create product (Admin) | Verify admin can create a product via API | 1\. POST to /api/users/login with admin credentials to get token 2\. Send POST to /api/products with Bearer token and product data 3\. Verify response 4\. GET /api/products and confirm product exists | Status 201, product created with a generated ID | Hard |
| **20** | API Testing | PUT update product (Admin) | Verify admin can update a product via API | 1\. Authenticate as admin 2\. Send PUT to /api/products/:id with updated fields 3\. Verify response 4\. GET /api/products/:id and verify updated values | Status 200, product fields updated successfully | Medium |
| **21** | API Testing | DELETE product (Admin) | Verify admin can delete a product via API | 1\. Authenticate as admin 2\. Send DELETE to /api/products/:id 3\. Verify response 4\. GET /api/products/:id and verify deletion | Status 200 or 204, product no longer retrievable | Medium |
| **22** | API Testing | POST user login | Verify the login API endpoint | 1\. Send POST to /api/users/login 2\. Include valid email (customer@automationcamp.org) and password 3\. Verify response | Status 200, returns access token and user data (id, email, role) | Easy |
| **23** | API Testing | POST create brand (Admin) | Verify admin can create a brand via API | 1\. Authenticate as admin 2\. Send POST to /api/brands with brand name 3\. Verify response | Status 201, brand created with id and name | Medium |
| **24** | API Testing | POST create cart and add item | Verify cart creation and add-to-cart API | 1\. Send POST to /api/carts to create a new cart 2\. Send POST to /api/carts/:id with product\_id and quantity 3\. GET /api/carts/:id and verify | Status 200/201 for both calls, product appears in the cart response | Medium |
| **25** | API Testing | POST place order (authenticated) | Verify checkout/order API | 1\. Authenticate as customer 2\. Create a cart with at least one item 3\. Send POST to /api/invoices with cart\_id, address, and payment details 4\. Verify response | Status 201, order created with a generated invoice ID and AWAITING\_FULFILLMENT status | Hard |
| **26** | API Testing | POST add to favorites | Verify add to favorites API | 1\. Authenticate as customer 2\. Send POST to /api/favorites with product\_id 3\. GET /api/favorites and verify addition | Status 200 or 201, product appears in the favorites list | Medium |
| **27** | API Testing | API authentication \- missing token | Verify protected endpoints require auth | 1\. Send GET to /api/users/me without an Authorization header 2\. Verify response | Status 401, unauthorized error returned | Easy |
