# Custom Hooks Pattern

## Rule: Functions Should Live in Custom Hooks

**When to place a function in a custom hook:**
- Function is created for specific feature/domain usage
- Function is used by components within that feature
- Function is NOT a common utility/helper

**When to keep functions as utilities:**
- Common utilities (string formatting, calculations, etc.)
- API helpers used across multiple features
- Helpers that don't depend on React hooks

## Implementation Pattern

1. Create/place function in feature's custom hook (e.g., `src/pages/feature/hook/useFeature.tsx`)
2. Export function from the custom hook
3. Import and use the hook in components
4. Keep concerns separated by feature

## Example Structure
```
src/pages/results/
├── hook/
│   └── useResults.tsx          # Feature-specific hooks here
│       ├── handleEdit()
│       ├── handleDelete()
│       └── handleBack()
└── components/
    └── data-table-row-actions.tsx  # Use hooks here
```

## Benefits
- Code reusability within feature
- Clean separation of concerns
- Easy to locate and maintain feature logic
- Testable and composable

## Real-World Examples

### Results Page - useInterviewForm Hook
```typescript
// src/pages/results/id/hook/use-interview-form.tsx
export default function useInterviewForm() {
  const navigate = useNavigate()
  const result = useData<Result>()

  const handleBack = () => {
    navigate('/results')
  }

  return {
    result,
    categoryList,
    handleBack,
  } as const
}
```

Then use in component:
```typescript
const { result, handleBack } = useInterviewForm()
<Button onClick={handleBack}>Back</Button>
```

### Question List Page - useResults Hook
```typescript
// src/pages/results/hook/useResults.tsx
export default function useResults() {
  const navigate = useNavigate()

  const handleEdit = (id: string) => {
    navigate(`/results/${id}`)
  }

  return {
    handleEdit,
  } as const
}
```
