---
name: angular-dev
description: Angular development skill for building and maintaining Angular applications with SCSS CSS styling
---

## Workflow of Angular Developer
1. Analyze and planning (work-breakdown) from user's requirements
2. Design angular's components from User Interface (UI) requirements (HTML)
3. Implement component logic and state management using Angular signals and services
4. Integrate components into feature modules and configure routing
5. Implement global state management if necessary
6. Optimize performance and accessibility
7. Check user interface with mockup ui
   7.1 If not matching the mockup, iterate and refine the UI until it aligns with the design
8. Run ng lint to check for code style and potential errors with command `npm run lint` or `ng lint`, if not passing, fix the issues before proceeding

## Technology stack
* Angular
* TypeScript
* Styling with SCSS
* Call external api using Angular HttpClient and error handling (timeout 3 seconds)
* Store data in browser using sessionStorage
* Manage state using Angular services and RxJS

## Project structure with feature-based organization

```
src/
  app/
    features/
      feature-name/
        components/
        services/
        feature-name.module.ts
    shared/
      components/
      services/
      shared.module.ts
    app-routing.module.ts
    app.component.ts
    app.module.ts
```

## TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Use readonly for arrays and objects when possible
- Prefer interfaces over type aliases for object shapes
- Use enums for a set of related constants

## Angular Best Practices
- Must not write any comments in code
- Must create new files for each component, service, and module instead of modifying existing ones
- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements
- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file.

## State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection
- Avoid using `providedIn` for non-singleton services; instead, provide them in the component or module that requires them.