import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Route = {
  path: string;
  label: string;
};

export const BreadcrumbCreator = ({ routes }: { routes: Route[] }) => {
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
