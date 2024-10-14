# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2024-10-06
### Added
- Added new Feature to list transactions.
- New feature to view detailed transactions.
- API integration for list and view transactions.
- Added search functionality in Transactions list.

### Changes
- Added changes in quick search functionality in generate bill to search by id, name and category.
- Added CSS changes to improve User impression
- Table layout changes on the all module
- Header and footer css changes to improve User experience

### Fixes
- Bill summary time is not showing properly issue fixed.

**NOTE:** Versions progressed from 0.2.1 to 0.2.9, incorporating multiple new features into the application.

## [0.2.0] - 2024-10-06
### Added
- Added new Feature to generate new bill.
- New feature to generate bill and able to see the bill summary.
- API integration for adding bill and purchase affect the inventory table.
- Added search functionality in inventory list.

### Fixes
- Added category based search in inventory and improved search filter.
- Minor css issue fix for improve user experience.

**NOTE:** Versions progressed from 0.1.1 to 0.1.9, incorporating multiple new features into the application.

## [0.1.0] - 2024-09-06
### Added
- Added new Feature to list all inventory items.
- New feature to add, edit and delete inventory.
- Added new feature toaster to show messages in inventory page.

### Fixes
- Changes in API response object on Login, users List, Roles List.
- Minor css issue fix for improve user experience.

**NOTE:** Versions progressed from 0.0.2 to 0.1.0, incorporating multiple new features into the application.

## [0.0.2] - 2024-09-06
### Added
- Added new component to register user with email.
- Component allows user to register as Admin.
- Added new guard that allows register and login page for only users are not currently logged in.

### Fixes
- Footer fixed on all the components issue fixed.
- CSS issue fixes for footer and login component.

## [0.0.1] - 2024-09-03
### Added
- Initial release of the Biller Application.
- User authentication module with JWT support.
- Role-based access control (RBAC) implemented.
- Added settings menu option to add, edit and view roles.
- Added settings menu option to view users.
- Login component added.
- Initial header menu options (Home, Statistics, Bill Genarator, Transactions and Settings) are added.
