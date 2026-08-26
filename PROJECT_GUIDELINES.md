# Project Guidelines & Architecture

These guidelines outline the workflow, architecture, and coding standards for this project. Please reference this file when creating new features or integrating APIs.

## 1. Postman API Reference
- **Collection**: Always use the **`Umrah API - Full Collection/Client`** folder in Postman to understand the API shape, requests, and responses.

## 2. Architecture (Simple BFF)
- We use a simple Backend-For-Frontend (BFF) architecture.
- Routes are dynamic: e.g., `/api/[module]/route.ts` (and same for nested `[id]`).

## 3. Workflow for Integrating APIs
When integrating a new API, follow this strict pipeline:
1. **Analyze**: Check the API shape and response in Postman.
2. **API Call**: Create the API call function in `features/<feature>/api.ts`.
3. **React Query Hook**: Wrap the API call using a custom React Query hook in `features/<feature>/hook.ts`.
4. **Usage**: Use the generated hook in the application components where needed.

## 4. Coding Standards
- **Simplicity First**: Avoid over-engineering. Write as little code as possible.
- **Notes & Comments**: Only leave comments on important, non-obvious things.
- **Components**: Prefer small, abstracted components. Avoid creating large, monolithic components.
- **Types**: **ALL** types must be placed in the global `types` folder located at `app/types`.

## 5. API Testing Base URL
- Before working on any endpoint, test its response shape by checking the live endpoint.
- **Base URL to check responses:** `http://umrah.azmy.aait-d.com/api/v1/client/{endpoint}`
- Use this URL directly (e.g., `http://umrah.azmy.aait-d.com/api/v1/client/timing-web`) to fetch and understand the exact JSON response shape before implementing.

## 6. Authentication & Testing
- When testing endpoints that require authentication (e.g., `"login first"` errors), use the following test credentials for the client app:
  - **Phone:** `1234567894`
  - **Phone Code:** `20` (Note: Send `20`, not `+20`)
  - **Password:** `123456789`
