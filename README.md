# Cypress Test Automation Framework

A Cypress test automation framework designed for multi-environment testing with support for UI and API testing.

Application under test: https://www.saucedemo.com/

## 🚀 Features

- **Multi-Environment Support**: Separate configurations for Dev, QA, and Production environments
- **Cross-Browser Testing**: Chrome, Edge, and WebKit support
- **GitHub Actions CI**: Automated test execution on push with parallel browser matrix
- **Cypress Cloud Integration**: Cloud recording and dashboard for test results and analytics
- **Test Organization**: Structured test suite with UI, API, Visual, and Data-Cy tests
- **Tag-Based Test Filtering**: Run specific test suites using tags (@smoke, @qa, @ui, etc.)
- **Page Object Model**: Maintainable test structure with reusable page objects
- **API Testing**: Built-in API testing capabilities
- **Code Quality**: ESLint and Prettier configuration for consistent code style

## 📋 Prerequisites

- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **Git**: For version control

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cypress-framework
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp cypress.env.json.dist cypress.env.json
```

4. Edit `cypress.env.json` with your credentials:
```json
{
    "CYPRESS_RECORD_KEY": "your-cypress-cloud-key",
    "username": "your-username",
    "password": "your-password"
}
```

5. Update Cypress Cloud Project ID:
   - Open `cypress.config.js`
   - Replace `projectId: "YOUR ID HERE"` with your actual Cypress Cloud project ID
   - Get your project ID from [Cypress Cloud Dashboard](https://cloud.cypress.io/)

## 📁 Project Structure

```
cypress-framework/
├── .github/
│   └── workflows/
│       └── main.yml         # GitHub Actions CI workflow
├── cypress/
│   ├── e2e/
│   │   ├── api/              # API test specifications
│   │   └── ui/               # UI test specifications
│   ├── fixtures/             # Test data files
│   ├── support/
│   │   ├── commands.js       # Custom Cypress commands
│   │   ├── e2e.js           # Global configuration
│   │   ├── page-objects/    # Page Object Models
│   │   └── utils.js         # Utility functions
├── github-workflows-examples/ # Example GitHub Actions workflows
│   ├── matrix-browsers.yml  # Browser matrix example
│   └── matrix-custom-run-commands.yml # Matrix with Custom npm scripts example
├── cypress.config.js         # Base Cypress configuration
├── dev.config.js            # Development environment config
├── qa.config.js             # QA environment config
├── prod.config.js           # Production environment config
├── eslint.config.js         # ESLint configuration
└── package.json             # Project dependencies and scripts
```

## 🎯 Usage

### Running Tests

#### Default Environment (QA)
```bash
npm run cy:open          # Open Cypress Test Runner
npm run cy:run           # Run tests in headless mode
```

#### Development Environment
```bash
npm run dev:open         # Open Test Runner for Dev
npm run dev:run          # Run all tests on Dev
npm run dev:run:chrome   # Run on Chrome browser
npm run dev:run:edge     # Run on Edge browser
npm run dev:run:webkit   # Run on WebKit browser
```

#### QA Environment
```bash
npm run qa:open          # Open Test Runner for QA
npm run qa:run           # Run all tests on QA
npm run qa:run:smoke     # Run smoke tests only
npm run qa:run:chrome    # Run on Chrome browser
npm run qa:run:edge      # Run on Edge browser
npm run qa:run:webkit    # Run on WebKit browser
```

#### Production Environment
```bash
npm run prod:open        # Open Test Runner for Production
npm run prod:run         # Run all tests on Production
npm run prod:run:chrome  # Run on Chrome browser
npm run prod:run:edge    # Run on Edge browser
npm run prod:run:webkit  # Run on WebKit browser
```

#### Cloud Recording
```bash
npm run qa:run:chrome:cloud   # Run Chrome tests with cloud recording
npm run qa:run:edge:cloud     # Run Edge tests with cloud recording
npm run qa:run:webkit:cloud   # Run WebKit tests with cloud recording
```

### Code Quality

```bash
npm run lint             # Run ESLint on test files
npm run format           # Format code with Prettier
```

## 🏷️ Test Tagging

Tests can be filtered using tags. Example tags:
- `@smoke` - Critical smoke tests
- `@ui` - UI tests
- `@api` - API tests

Run specific tagged tests:
```bash
npm run qa:run:smoke     # Run only smoke tests
npx cypress run --env grepTags=@ui  # Run UI tests only
```

## 🔧 Configuration

### Environment-Specific Settings

Each environment has its own configuration file that extends the base `cypress.config.js`:

- **Base URL**: Automatically set per environment
- **API Base URL**: Separate API endpoint configuration
- **Viewport**: 1920x1080 default viewport
- **Retries**: 1 retry in run mode, 0 in open mode
- **Timeouts**: 
  - Page Load: 20 seconds
  - Command: 15 seconds

### Key Configuration Options

```javascript
{
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalMemoryManagement: true,
    experimentalWebKitSupport: true,
    chromeWebSecurity: false,
    watchForFileChanges: false,
    retries: { "openMode": 0, "runMode": 1 }
}
```

## 📦 Plugins & Extensions

This framework includes:

- **@bahmutov/cy-grep**: Test filtering by tags
- **cypress-plugin-api**: Enhanced API testing
- **cypress-plugin-steps**: Step-by-step test reporting
- **@4tw/cypress-drag-drop**: Drag and drop support
- **cypress-real-events**: Real browser events
- **cypress-if**: Conditional testing
- **cypress-recurse**: Retry logic for flaky tests

## 📝 Writing Tests

### UI Test Example

```javascript
describe('Sample UI Test', { tags: ['@regression', '@ui'] }, () => {
    beforeEach(() => {
        cy.visit('/')
    })
    
    it('Should perform login', { tags: ['@smoke'] }, () => {
        cy.get('[data-test="username"]').type('user')
        cy.get('[data-test="password"]').type('pass')
        cy.get('[data-test="login-button"]').click()
    })
})
```

### API Test Example

```javascript
describe('API Tests', { tags: ['@api'] }, () => {
    it('Should create a resource', () => {
        cy.api({
            method: 'POST',
            url: '/api/endpoint',
            body: { data: 'value' }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })
})
```

## 📊 Reports

Test results are stored in:
- **Screenshots**: `cypress/reports/screenshots/`
- **Videos**: `cypress/reports/videos/`
- **Downloads**: `cypress/downloads/`

## 🔄 CI/CD Integration

### GitHub Actions

This framework includes automated CI/CD pipeline with GitHub Actions:

**Features:**
- Automated test execution on every push
- Parallel browser matrix (Electron, Chrome)
- Cypress Cloud recording with test results dashboard
- Automatic dependency caching for faster builds

**Workflow Configuration:**
The workflow is defined in `.github/workflows/main.yml` and runs tests across multiple browsers in parallel.

**Sample Workflows:**
Check the `github-workflows-examples/` folder for additional workflow examples:
- `matrix-browsers.yml` - Example of browser matrix strategy
- `matrix-custom-run-commands.yml` - Example using custom npm scripts in matrix

**Required GitHub Secrets:**

Add these secrets in your GitHub repository (Settings → Secrets and variables → Actions → Repository secrets):

1. `CYPRESS_USERNAME` - Test user username
2. `CYPRESS_PASSWORD` - Test user password
3. `CYPRESS_RECORD_KEY` - Cypress Cloud recording key (get from Cypress Dashboard)

**View Results:**
- GitHub Actions: Check the Actions tab in your repository
- Cypress Cloud: Visit [Cypress Cloud Dashboard](https://cloud.cypress.io/) to view detailed test results, screenshots, and videos

## 🐛 Debugging

1. Use `cy.debug()` to pause test execution
2. Use `cy.pause()` to pause in interactive mode
3. Enable Chrome DevTools for inspection
4. Review screenshots and videos in the reports folder

## 🤝 Contributing

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Run `npm run format` to format code
4. Tag tests appropriately
5. Update documentation as needed

## 📄 Environment Variables

Add these to your `cypress.env.json`:

```json
{
    "CYPRESS_RECORD_KEY": "your-key",
    "username": "test-user",
    "password": "test-password",
}
```

## 🔐 Security

- Never commit `cypress.env.json` to version control
- Use `.env` files for sensitive data
- Rotate credentials regularly
- Use CI/CD secrets for cloud recording keys

## 🆘 Troubleshooting

### Common Issues

**Issue**: Tests failing due to timeout
**Solution**: Increase timeout in configuration or use `cy.wait()` strategically

**Issue**: WebKit tests failing
**Solution**: Ensure `injectDocumentDomain=true` is set and `playwright-webkit` is installed

**Issue**: Cloud recording not working
**Solution**: Verify `CYPRESS_RECORD_KEY` is set correctly and `projectId` is configured

**Issue**: ESLint errors
**Solution**: Run `npm run format` and fix remaining issues manually

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [cy-grep Plugin](https://github.com/bahmutov/cy-grep)

