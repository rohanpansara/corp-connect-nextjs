import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type RouteDataProp = {
  path: string;
  label: string;
};

export const CustomBreadcrumb = ({ routes }: { routes: RouteDataProp[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {routes.map((route, index) => (
          <BreadcrumbItem key={route.path}>
            <BreadcrumbLink href={route.path}>{route.label}</BreadcrumbLink>
            {index < routes.length - 1 && (
              <span>
                <BreadcrumbSeparator />
              </span>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
