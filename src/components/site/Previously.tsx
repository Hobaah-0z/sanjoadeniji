export function Previously() {
  const companies = [
    {
      name: "Polkadot Africa",
      role: "Senior Visual Designer",
    },
    {
      name: "Radius",
      role: "Visual Designer",
    },
    {
      name: "Hyperbridge",
      role: "Visual Designer",
    },
  ];

  return (
    <section className="border-t border-foreground/10 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">

        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-foreground/50">
          Previously
        </p>

        <div className="space-y-8">

          {companies.map((company) => (
            <div
              key={company.name}
              className="group flex items-center justify-between border-b border-foreground/10 pb-8 transition-all duration-300 hover:opacity-80"
            >
              <div className="flex items-center gap-6">

                {/* Replace with logo later */}
                <div className="h-14 w-14 rounded-full bg-neutral-200 dark:bg-neutral-800" />

                <div>
                  <h3 className="font-display text-3xl uppercase">
                    {company.name}
                  </h3>

                  <p className="mt-1 text-foreground/60">
                    {company.role}
                  </p>
                </div>

              </div>

              <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
  ↗
</span>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}