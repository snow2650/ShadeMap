import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MapPin, Route, Settings, Sun } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Route Planner",
    url: createPageUrl("RoutePlanner"),
    icon: MapPin,
  },
  {
    title: "My Routes",
    url: createPageUrl("SavedRoutes"),
    icon: Route,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --shade-primary: #0f172a;
          --shade-secondary: #1e293b;
          --shade-accent: #059669;
          --shade-muted: #64748b;
          --shade-background: #f8fafc;
          --shade-foreground: #0f172a;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-emerald-50">
        <Sidebar className="border-r border-slate-200 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">ShadePath</h2>
                <p className="text-xs text-slate-500 font-medium">Vancouver Shade Routes</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-emerald-50 text-emerald-700 shadow-sm' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Today's Weather</span>
                    <span className="font-semibold text-slate-900">24°C</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">UV Index</span>
                    <span className="font-semibold text-orange-600">High</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Best Shade Time</span>
                    <span className="font-semibold text-emerald-600">2-4 PM</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 text-sm truncate">User</p>
                <p className="text-xs text-slate-500 truncate">Stay cool in Vancouver</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-xl transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-900">ShadePath</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}