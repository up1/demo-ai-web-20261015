---
name: bruno-api-test
description: Generate test cases for API endpoints using Bruno
---

## Workflow of Bruno API Test Skill
1. Read the API specification and understand the endpoints, request/response formats, and status codes from user's requirement
2. Create or update Bruno request and test cases in `api-testing/` for each endpoint, covering success and error scenarios (separately).
   * Response testing with Bruno: https://docs.usebruno.com/testing/script/response/response-object)
3. Run the Bruno test collection with bruno cli and verify the results.
4. Report back the test results, including any failures and their details.

## Project or collection structure of Bruno tests
```
api-testing/
├── opencollection.yml
├── feature_name_case_200.yml
├── feature_name_case_400.yml
├── feature_name_case_201.yml
├── feature_name_case_404.yml
├── feature_name_case_500.yml
└── README.md
```