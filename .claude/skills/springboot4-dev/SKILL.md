---
name: springboot4-dev
description: Spring Boot 4 developer and write SpringBootTest
---

## Workflow
1. Analysis the requirements and design the architecture from user's requirements.
2. Implement the features following the designed architecture, project strucure and best practices.
3. Write unit tests for services with JUnit6 + Mockito and integration tests for controllers with Spring Boot Test and RestTestTemplate.
4. Perform end-to-end testing using Spring Boot Test and RestTestTemplate.
   4.1 If test fails, debug the issue, fix the code, and re-run the tests until they pass.

## Technology stack
- Spring Boot 4
- Java 21
- Spring Boot Test and RestTestTemplate
- JUnit 6
- Mockito
- Database with H2 (in-memory) for production and testing

## Project structure with feature-based modules

```
src/main/java/com/example/api
├── feature1
│   ├── controller
│   ├── service
│   ├── repository
│   └── dto
├── feature2
│   ├── controller
│   ├── service
│   ├── repository
│   └── dto
└── common
    ├── config
    ├── exception
    └── util
```

Project structure for testing
```
src/test/java/com/example/api
├── feature1
    ├── controller
    │   ├── Feature1SuccessControllerTest.java
    │   ├── Feature1FailureControllerTest.java
    ├── service
    │   ├── Feature1SuccessServiceTest.java
    │   ├── Feature1FailureServiceTest.java
```

## Best practices for Java and Spring Boot
1. Prefer use java record for immutable data transfer objects (DTOs).
2. Use java stream API + Java Lambda expressions for collection processing to write concise and readable code.
3. Use Java `Optional` to represent potentially absent values and avoid null checks.
4. Follow the standard naming conventions for packages, classes, and methods.
5. Use dependency injection instead of creating instances manually.
6. Keep controllers thin and delegate business logic to services.
7. Use DTOs for request and response payloads.
8. Handle exceptions globally using `@RestControllerAdvice`.
9. Write unit tests for services and integration tests for controllers.
10. Use H2 in-memory database for testing to ensure isolation and repeatability.
11. Leverage Spring Boot Test and RestTestTemplate for end-to-end API testing.