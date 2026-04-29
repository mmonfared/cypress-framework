# Practice Cypress \- Final Project

by: Moe Monfared

## Cypress \+ JavaScript Automation Framework

**Template Framework:** [https://github.com/mmonfared/cypress-framework](https://github.com/mmonfared/cypress-framework)   
**Application Under Test:** [https://practicesoftwaretesting.com/](https://practicesoftwaretesting.com/)  
**API:** [https://api.practicesoftwaretesting.com](https://api.practicesoftwaretesting.com)  
**Swagger:** [https://api.practicesoftwaretesting.com/api/documentation](https://api.practicesoftwaretesting.com/api/documentation)   
**Version:** Toolshop v5.0

---

## Test Accounts

| Email | Password | Role |
| :---- | :---- | :---- |
| [customer@practicesoftwaretesting.com](mailto:customer@practicesoftwaretesting.com) | welcome01 | User |
| [customer2@practicesoftwaretesting.com](mailto:customer@practicesoftwaretesting.com) | welcome01 | User |
| [customer3@practicesoftwaretesting.com](mailto:customer3@practicesoftwaretesting.com)  | pass123 | User |
| [admin@practicesoftwaretesting.com](mailto:admin@practicesoftwaretesting.com) | welcome01 | Admin |

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
| **1** | Authentication | Valid user login | Verify user can login with valid credentials | 1\. Navigate to home page 2\. Click Sign In 3\. Enter valid email 4\. Enter valid password 5\. Click Login button | User is redirected to My Account page with "My account" page title visible | Easy |
| **2** | Authentication | Invalid login \- wrong password | Verify error message for invalid credentials | 1\. Navigate to login page 2\. Enter valid email 3\. Enter wrong password 4\. Click Login button | Error message displayed: "Invalid email or password" | Easy |
| **3** | Authentication | Successful user registration | Verify new user can register with valid data | 1\. Navigate to registration page 2\. Fill all required fields with valid data 3\. Enter strong password 4\. Submit form | Registration successful, user redirected to login page | Medium |
| **4** | Product | Display products on home page | Verify products are displayed on landing page | 1\. Navigate to home page 2\. Verify product grid is visible | At least 9 products are displayed with name and price | Easy |
| **5** | Product | Product search with valid keyword | Verify search returns matching products | 1\. Navigate to home page 2\. Enter "helmet" in search box 3\. Click search button | Products containing "helmet" are displayed, search results caption shows the term | Medium |
| **6** | Product | Filter products | Verify category filter works | 1\. Navigate to home page 2\. Select "Hand Saw" category filter 3\. Verify filtered results | Only saws are displayed | Medium |
| **7** | Product | Sort products by price (Low to High) | Verify sorting functionality | 1\. Navigate to home page 2\. Select "Price (Low \- High)" from sort dropdown 3\. Verify product order | Products are sorted with lowest price first | Medium |
| **8** | Shopping Cart | Add product to cart as guest | Verify guest user can add product to cart | 1\. Navigate to home page 2\. Click on a product 3\. Click "Add to Cart" 4\. Verify cart badge | Cart badge shows quantity "1", success message displayed | Easy |
| **9** | Shopping Cart | Update quantity in cart | Verify quantity can be updated in cart | 1\. Add product to cart 2\. Go to checkout/cart 3\. Change quantity to 5 4\. Verify total | Quantity updated to 5, total price recalculated | Medium |
| **10** | Shopping Cart | Remove product from cart | Verify product can be removed from cart | 1\. Add product to cart 2\. Go to cart 3\. Click remove/delete button 4\. Verify cart | Product is removed, cart badge decreases | Easy |
| **11** | Favorites | Add product to favorites (logged in) | Verify logged-in user can add to favorites | 1\. Login 2\. Navigate to product detail 3\. Click "Add to Favorites" 4\. Go to My Favorites | Product appears in favorites list | Medium |
| **12** | Contact Form | Submit contact form as guest | Verify guest can submit contact form | 1\. Navigate to Contact page 2\. Fill first name, last name, email 3\. Select subject 4\. Enter message (min 50 chars) 5\. Submit | Form submitted successfully, confirmation message displayed | Medium |
| **13** | User Account | View user profile | Verify user can view profile | 1\. Login 2\. Navigate to My Account 3\. Click Profile 4\. Verify profile fields | All user details are displayed (name, address, phone, email) | Easy |
| **14** | Admin Panel | Add new brand | Verify admin can add brand | 1\. Login as admin 2\. Go to Brands 3\. Click Add Brand 4\. Fill brand name 5\. Save | New brand is created and appears in list | Medium |
| **15** | Admin Panel | Add new product | Verify admin can add product | 1\. Login as admin 2\. Go to Products 3\. Click Add Product 4\. Fill all required fields 5\. Save | New product is created and visible on frontend | Hard |
| **16** | Admin Panel | Update order status | Verify admin can change order status | 1\. Login as admin 2\. Go to Orders 3\. Edit an order 4\. Change status to "SHIPPED" 5\. Save | Order status updated to SHIPPED | Medium |
| **17** | Admin Panel | Disable user account | Verify admin can disable user | 1\. Login as admin 2\. Go to Users 3\. Edit a user 4\. Disable account 5\. Save 6\. Try to login as that user | User account is disabled, login shows disabled message | Hard |
| **18** | API Testing | GET all products | Verify products list endpoint | 1\. Send GET request to /products 2\. Verify response status 3\. Verify response structure | Status 200, JSON array of products with id, name, price fields | Medium |
| **19** | API Testing | POST create product (Admin) | Verify admin can create product via API | 1\. Login as admin to get token 2\. Send POST to /products with auth header 3\. Include product data 4\. Verify response 5\. Get all products and verify addition | Status 201, product created with generated ID | Hard |
| **20** | API Testing | PUT update product (Admin) | Verify admin can update product | 1\. Authenticate as admin 2\. Send PUT to /products/{id} 3\. Include updated data 4\. Verify response 5\. Get project details and verify update | Status 200, product updated successfully | Medium |
| **21** | API Testing | DELETE product (Admin) | Verify admin can delete product | 1\. Authenticate as admin 2\. Send DELETE to /products/{id} 3\. Verify response 4\. Get all products and verify deletion | Status 200 or 204, product deleted | Medium |
| **22** | API Testing | POST user login | Verify login API endpoint | 1\. Send POST to /users/login 2\. Include valid email and password 3\. Verify response | Status 200, returns access token and user data | Easy |
| **23** | API Testing | POST create brand (Admin) | Verify admin can create brand | 1\. Authenticate as admin 2\. Send POST to /brands 3\. Include brand name 4\. Verify response | Status 201, brand created | Medium |
| **24** | API Testing | POST add to cart | Verify add product to cart API | 1\. Send POST to /cart 2\. Include product\_id and quantity 3\. Verify response | Status 200, product added to cart | Medium |
| **25** | API Testing | POST create order/checkout | Verify checkout API | 1\. Authenticate 2\. Add items to cart 3\. Send POST to /orders 4\. Include payment and address 5\. Verify response | Status 201, order created with order ID | Hard |
| **26** | API Testing | POST add to favorites | Verify add product to favorites | 1\. Authenticate 2\. Send POST to /favorites 3\. Include product\_id 4\. Verify response 5\. Get all favorites and verify addition | Status 200 or 201, product added to favorites | Medium |
| **27** | API Testing | API authentication \- missing token | Verify protected endpoints require auth | 1\. Send GET to /users/me without token 2\. Verify response | Status 401, unauthorized error | Easy |

