import { NavLink } from "@/components/nav-link"

export function MainNav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto">
        <div className="flex space-x-8">
          <NavLink href="/">
            Meal Attendance
          </NavLink>
          <NavLink href="/weekly-plan">
            Weekly Plan
          </NavLink>
          <NavLink href="/recipes">
            Recipes & Ingredients
          </NavLink>
          <NavLink href="/inventory">
            <span className="relative">
              Inventory
              <span className="absolute -top-2 -right-6 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
