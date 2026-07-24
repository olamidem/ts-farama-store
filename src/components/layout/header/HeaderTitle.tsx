import { createRouterConfig, useRouterState } from "@tanstack/react-router";

const HeaderTitle = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const page =
    createRouterConfig[pathname] ?? {
      title: "Farama ERP Lite",
      subtitle: "",
    };

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-800">
        {page.title}
      </h1>

      <p className="text-sm text-slate-500">
        {page.subtitle}
      </p>
    </div>
  );
};

export default HeaderTitle;