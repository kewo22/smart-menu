import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@smart-menu-workspace/shared-ui';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <Card className="w-full max-w-2xl p-20">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold tracking-tight">
            Smart Menu Dashboard
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Tailwind v4 + shadcn/ui shared library is now active.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="w-full max-w-sm mx-auto space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email address
              </label>
              <Input type="email" id="email" placeholder="Enter your email" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center pt-4">
            <Button>Standard Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="secondary" size="xs">XC Button</Button>
            <Button disabled variant="secondary" size="xs">XC Button</Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start pt-6 mt-6 border-t">
          <h2 className="font-semibold mb-2">Verification Checklist:</h2>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>Tailwind v4 @import syntax works</li>
            <li>shadcn/ui Shared Components (Button, Input, Card)</li>
            <li>CSS Variables (@theme) are applied</li>
            <li>Nx shared library (@smart-menu-workspace/shared-ui)</li>
          </ul>
        </CardFooter>
      </Card>
    </div >
  );
}
