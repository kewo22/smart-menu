import { Button } from '@/components/ui/button';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Smart Menu Dashboard
        </h1>
        <p className="text-muted-foreground">
          Tailwind v4 + shadcn/ui is now active in this Nx project.
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <Button>Standard Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="destructive">Destructive Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="secondary" size="xs">XC Button</Button>
        <Button disabled variant="secondary" size="xs">XC Button</Button>
      </div>

      <div className="mt-8 p-4 border rounded-lg bg-card text-card-foreground shadow-sm max-w-md">
        <h2 className="font-semibold mb-2">Verification Checklist:</h2>
        <ul className="text-sm list-disc list-inside space-y-1">
          <li>Tailwind v4 @import syntax works</li>
          <li>shadcn/ui Button component renders</li>
          <li>CSS Variables (@theme) are applied</li>
          <li>Nx alias (@/*) is resolving correctly</li>
        </ul>
      </div>
    </div >
  );
}
